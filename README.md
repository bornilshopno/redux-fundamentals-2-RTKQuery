# RTK Query with React + TypeScript + Vite app

## STEP-1  : Installation

```
 Step 1: Install Dependencies

```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.








## Manual Refetching in Redux

## Option-1:  With tags

- pass a object as params in =>createAPI ( `tagTypes:['task'],` )
- pass a object as params in get API => builder.query ( ` providesTags: ["task"],` )
- pass a object as param in POST API=> builder.mutation (` invalidatesTags:["task"] `)

## Option-2: 

- using polling interval in the front end GET operation. example uses (cricinfo)
- we need pass the obejct as params in =>getQuery( `{ pollingInterval: 1000 }` )

```ts
   const { isLoading, data}=useGetTasksQuery(undefined, { pollingInterval: 1000 })
```

- other options from front end GET operation

```ts
//normal scenario
  const { isLoading, data}=useGetTasksQuery(undefined)
//refetch on focus
  const { isLoading, data}=useGetTasksQuery(undefined, {refetchOnFocus:true})
//refetch on route chane
  const { isLoading, data}=useGetTasksQuery(undefined, {refetchOnMountOrArgChange:true})
//refetch on network(internet) reconnect
  const { isLoading, data}=useGetTasksQuery(undefined, {refetchOnReconnect:true})
```

