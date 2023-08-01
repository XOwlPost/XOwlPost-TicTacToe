export const HeadersRequest: SchemaObject = {
  type: 'object',
  properties: {
    authorization: { type: 'string', pattern: '^Bearer [A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$' },
    contentType: { type: 'string', enum: ['application/json', 'application/xml'] },
    acceptLanguage: { type: 'string' },
    userAgent: { type: 'string' },
    xApiKey: { type: 'string' },
    requestId: { type: 'string' },
    timestamp: { type: 'string', format: 'date-time' },
    customHeader1: { type: 'string' },
    customHeader2: { type: 'string' },
    // Add more custom headers as needed
  },
  required: ['authorization', 'contentType', 'xApiKey', 'timestamp', 'requestId', 'userAgent', 'acceptLanguage'],
};
