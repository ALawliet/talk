import ApolloClient, {addTypename} from 'apollo-client';
import {networkInterface} from './transport';
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws';
import MessageTypes from 'subscriptions-transport-ws/dist/message-types';
import {getAuthToken} from '../helpers/request';

let client, wsClient = null, wsClientToken = null;

export function resetWebsocket() {
  if (wsClient === null) {

    // Nothing to reset!
    return;
  }

  // Close socket connection which will also unregister subscriptions on the server-side.
  wsClient.close();

  // Reconnect to the server.
  wsClient.connect();

  // Reregister all subscriptions (uses non public api).
  // See: https://github.com/apollographql/subscriptions-transport-ws/issues/171
  Object.keys(wsClient.operations).forEach((id) => {
    wsClient.sendMessage(id, MessageTypes.GQL_START, wsClient.operations[id].options);
  });
}

export function getClient(options = {}) {
  if (client) {
    return client;
  }

  const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  wsClient = new SubscriptionClient(`${protocol}://${location.host}/api/v1/live`, {
    reconnect: true,
    lazy: true,
    connectionParams: {
      get token() {

        wsClientToken = getAuthToken();

        // Try to get the token from localStorage. If it isn't here, it may
        // be passed as a cookie.

        // NOTE: THIS IS ONLY EVER EVALUATED ONCE, IN ORDER TO SEND A DIFFERNT
        // TOKEN YOU MUST DISCONNECT AND RECONNECT THE WEBSOCKET CLIENT.
        return wsClientToken;
      }
    }
  });

  const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
  );

  client = new ApolloClient({
    ...options,
    connectToDevTools: true,
    addTypename: true,
    queryTransformer: addTypename,
    dataIdFromObject: (result) => {
      if (result.id && result.__typename) { // eslint-disable-line no-underscore-dangle
        return `${result.__typename}_${result.id}`; // eslint-disable-line no-underscore-dangle
      }
      return null;
    },
    networkInterface: networkInterfaceWithSubscriptions,
  });

  return client;
}
