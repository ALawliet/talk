import ApolloClient, {addTypename} from 'apollo-client';
import {networkInterface} from './transport';

// import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws';

// TODO: replace absolute reference with something loaded from the store/page.
// const wsClient = new SubscriptionClient('ws://localhost:3000/api/v1/live', {
//   reconnect: true
// });
// const networkInterface = addGraphQLSubscriptions(
//   getNetworkInterface(),
//   wsClient,
// );
export const client = new ApolloClient({
  connectToDevTools: true,
  addTypename: true,
  queryTransformer: addTypename,
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) { // eslint-disable-line no-underscore-dangle
      return `${result.__typename}_${result.id}`; // eslint-disable-line no-underscore-dangle
    }
    return null;
  },
  networkInterface
});

export default client;

