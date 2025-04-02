import { createApi , fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Project, SearchResults, Task , User , Team } from "./types";

export const api = createApi({
    baseQuery : fetchBaseQuery({
        baseUrl : process.env.NEXT_PUBLIC_API_URL
    }),
    reducerPath : 'api',
    tagTypes : ['Projects' , 'Tasks' , 'Users', 'Teams'],
    endpoints : (build) => ({
        getProjects : build.query<Project[] , void>({
            query : () => 'project/findAll',
            providesTags : ['Projects'],
            transformResponse: (response: { data: Project[] }) => response.data,
        }),
        createProject : build.mutation<Project , Partial<Project>>({
            query : (project)=> ({
                url : 'project/createProject',
                method : 'POST',
                body : project
            }),
            invalidatesTags : ['Projects'],
            
        }),
        getTasks : build.query<Task[] , {projectId : number}>({
            query : ({projectId}) => `task/getTasks?projectId=${projectId}`,
            providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
          keepUnusedDataFor : 6000,
          transformResponse: (response: { data: Task[] }) => response.data,
        }),
        createTask: build.mutation<Task, Partial<Task>>({
            query: (task) => ({
              url: "task/createTask",
              method: "POST",
              body: task,
            }),
            invalidatesTags: ["Tasks"],
          }),
          updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
            query: ({ taskId, status }) => ({
              url: `task/updateTask/${taskId}`,
              method: "PATCH",
              body: { status },
            }),
            invalidatesTags: (result, error, { taskId }) => [
              { type: "Tasks", id: taskId },
            ],
          }),
          getUsers : build.query<User[] , void>({
            query : () => 'users/getAllUsers',
            providesTags : ['Users'],
            transformResponse : (response  : {data : User[]}) => {
              return response.data;
            },
          }),
          getSearchResults : build.query<SearchResults , {query : string}>({
              query : ({query}) => `task?query=${query}`,

          }),
          getTeams : build.query<Team[] , void>({
              query : () => 'teams/getTeams',
              providesTags : ['Teams'],
              transformResponse : (response : {data : Team[]})=>{
                console.log(response.data);
                return response.data;
              }
          }),
          getTasksByUserId : build.query<Task[] , number>({
            query : (userId) => `task/getTaskByUser/${userId}`,
            providesTags: (result, error, userId) =>
            result
              ? result.map(({ id }) => ({ type: "Tasks", id }))
              : [{ type: "Tasks", id: userId }],
            transformResponse : (response : {data : Task[]})=>{
              console.log(response)
              return response.data;
            }
          }),
          // getAuthUser: build.query({
          //   queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
          //     try {
          //       const user = await getCurrentUser();
          //       const session = await fetchAuthSession();
          //       if (!session) throw new Error("No session found");
          //       const { userSub } = session;
          //       const { accessToken } = session.tokens ?? {};
      
          //       const userDetailsResponse = await fetchWithBQ(`users/${userSub}`);
          //       const userDetails = userDetailsResponse.data as User;
      
          //       return { data: { user, userSub, userDetails } };
          //     } catch (error: any) {
          //       return { error: error.message || "Could not fetch user data" };
          //     }
          //   },
          // }),
    })
})

export const {
    useGetProjectsQuery,
    useCreateProjectMutation,
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskStatusMutation,
    useGetSearchResultsQuery,
    useGetUsersQuery,
    useGetTeamsQuery,
    useGetTasksByUserIdQuery
} = api;