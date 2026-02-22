export default {
  /* HTTP level status code*/
  'http.0': 'Bad network network, please try again later',
  'http.403': 'You do not have access to this resource',
  'http.others': 'Something unexpected happened (status code:0), please try again later',

  /* Application level error code */
  '1000': 'Something unexpected happened (status code:1), try again later',
  '1001': 'Something unexpected happened (status code:2), try again later',
  '1002': 'Something unexpected happened (status code:3), try again later',
  '1011': 'Invalid parameter (e.g., parameter is empty or out of range)',
  '1012': 'Parameter format wrong',
  '1013': 'System parameter initialization error',
  '1014': 'JWT Token format invalid',
  '1015': 'This HTTP request is not supported by Back-end',
  '1020': 'Invalid username or password',
  '1021': 'Invalid token, please try re-login',
  '1022': 'Invalid token, please try re-login',
  '1023': 'Invalid token type',
  '10000': 'Application level error message : SILENT',
  '10001': 'Application level error message : WARN_MESSAGE',
  '10002': 'Application level error message : ERROR_MESSAGE',
  '10003': 'Application level error message : NOTIFICATION',
  '10009': 'Application level error message : REDIRECT',
};
