import { neo4jgraphql } from "neo4j-graphql-js";
export const resolvers={
  Query: {
      allUser: (obj, params, context, resolveInfo) => {
        // console.log(obj); undefined
        // console.log(params); vacio
        // console.log(context);
        return neo4jgraphql(obj,params, context, resolveInfo);
      },
      UserBy:(obj, params, ctx, resolveInfo)=>{
        return neo4jgraphql(obj, params, ctx, resolveInfo)
      }
    }
}

