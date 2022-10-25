import { request, publicRequest } from '$lib/helpers/request';
import { print } from 'graphql';
import gql from 'graphql-tag';


export const query = {
    signUp: gql`
        mutation($fullName: String! $email: String!, $password: String!, $role: String!){
            signUp(fullName:$fullName, email:$email, password:$password, role:$role){
                id
                createdAt
                updatedAt
            }
        }`,

    signIn: gql`
        mutation($email: String!, $password: String!){
            signIn(email:$email, password:$password) { 
                id
                role
                email
                token
                tokenExpiredAt
                username
                progress
            }
        }`,

    signOut: gql`
        mutation($email: String!, $password: String!){
            signOut(email:$email, password:$password) { 
                token
                expiredAt
            }
        }`,
    verifyEmail: gql`
        mutation($id: ID!, $code: String!){
            verifyEmail(id:$id, code:$code) { 
                id
                role
                email
                token
                tokenExpiredAt
                username
                progress
            }
        }`,

    refresh: gql`
        query{
            refresh{
                id
                role
                email
                token
                tokenExpiredAt
                username
                progress
            }
        }`,
}

const Auth = {
    query: (path: string, variables: object) => {
        const queryString = print(query[path])
        request(path, queryString, variables)
    },

    queryPublic: (path: string, variables: object) => {
        const queryString = print(query[path])
        return publicRequest(queryString, variables)
    }
}

export default Auth