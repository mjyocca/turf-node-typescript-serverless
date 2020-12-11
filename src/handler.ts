import { APIGatewayProxyHandler } from 'aws-lambda';
import { clusterPoints as clusterData } from './lib/turfService';
import 'source-map-support/register';

/**
 * 
 * @param event 
 * @param _context 
 */
export const clusterPoints: APIGatewayProxyHandler = async (event, _context) => {
  const { body } = event;
  const requestBody = JSON.parse(body);
  // call clusterService function
  const payload = clusterData(requestBody);

  return {
    statusCode: 200,
    body: JSON.stringify(payload),
  };
}
