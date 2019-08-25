module.exports = {
  "config": {
    "validation": {
      "schema": {
        "type": "object",
        "properties": {
          "enabled": {
            "type": "boolean"
          },
          "trustProxy": {
            "type": "boolean"
          },
          "hasETag": {
            "type": "boolean"
          },
          "printRequestInfo": {
            "type": "boolean",
            "description": "Log the information of every requests"
          },
          "sslProtectedUrls": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "cacheControl": {
            "type": "object"
          },
          "session": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "secret": {
                "type": "string"
              },
              "cookie": {
                "type": "object"
              },
              "store": {
                "oneOf": [
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": ["file"]
                      }
                    }
                  },
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": ["redis"]
                      }
                    }
                  },
                  {
                    "type": "object",
                    "properties": {
                      "type": {
                        "type": "string",
                        "enum": ["mongo", "mongodb"]
                      }
                    }
                  }
                ]
              }
            }
          },
          "jsonBodySizeLimit": {
            "type": "string"
          },
          "setPoweredBy": {
            "oneOf": [
              {
                "type": "boolean"
              },
              {
                "type": "string"
              }
            ]
          },
          "defaultRedirectUrl": {
            "type": "string"
          }
        }
      }
    }
  }
};
