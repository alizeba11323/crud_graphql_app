const { MapperKind, getDirective, mapSchema } = require("@graphql-tools/utils");
const { GraphQLError, defaultFieldResolver } = require("graphql");
const AuthDirectiveTransformer = (schema) => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, "auth")?.[0];
      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = function (source, args, context, info) {
          if (!context.isAuth) {
            throw new GraphQLError("Your are not Login", {
              extensions: {
                code: "UNAUTHORIZED",
                http: {
                  status: 401,
                },
              },
            });
          }
          return resolve(source, args, context, info);
        };
        return fieldConfig;
      }
    },
  });
};

module.exports = AuthDirectiveTransformer;
