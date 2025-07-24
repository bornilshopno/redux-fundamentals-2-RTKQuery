# RTK Query with React + TypeScript + Vite app

## STEP-1  : Installation

```ts
npm install @reduxjs/toolkit react-redux
npm install --save-dev typescript @types/react @types/react-dom
```


## STEP-2 : Type Defination 

```ts
export interface ITask {
  id: string;
  title: string;
}
```

## STEP-3 :  Create RTK Query API taskSlice

```ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITask } from '../../types';

export const taskSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query<ITask[], void>({
      query: () => 'tasks',
      providesTags: ['Tasks'],
    }),
    addTask: builder.mutation<void, Partial<ITask>>({
      query: (newTask) => ({
        url: 'tasks',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: ['Tasks'],
    }),
    deleteTask: builder.mutation<void, string>({
      query: (taskId) => ({
        url: `tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation<void, ITask>({
      query: ({ id, ...rest }) => ({
        url: `tasks/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = taskSlice;

```

## Step-4 : Set Up Redux Store

```ts
import { configureStore } from '@reduxjs/toolkit';
import { taskSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    [taskSlice.reducerPath]: taskSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(taskSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

```

## Step 5 : Wrap App with Redux Provider
```ts
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

```
--------------------------------------

##  Step 6: Add Task Form (POST)

```ts
import { useAddTaskMutation } from '../features/api/taskSlice';

 const [addTask] = useAddTaskMutation();

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      await addTask({ title });
    }
  };

```

## Step 7: Task List with Edit/Delete (GET, DELETE, PUT)

```ts
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from '../features/api/taskSlice';
import { ITask } from '../types';


  const { data: tasks, isLoading, isError } = useGetTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading tasks.</p>;

  const startEdit = (task: ITask) => {
    setEditingId(task.id);
    setEditText(task.title);
  };

  const handleUpdate = async (task: ITask) => {
    if (editText.trim()) {
      await updateTask({ id: task.id, title: editText });
      setEditingId(null);
      setEditText('');
    }
  };

  //UI=conditional rendering on tasks.map
{editingId === task.id ?
<> 
  <input
         value={editText}
         onChange={(e) => setEditText(e.target.value)}
          />
   <button onClick={() => handleUpdate(task)}>Save</button>
   <button onClick={() => setEditingId(null)}>Cancel</button>

</> :
<>
   {task.title}
   <button onClick={() => startEdit(task)}>Edit</button>
   <button onClick={() => deleteTask(task.id)}>Delete</button>
</>
}
```


## Standard Folder Structure
```css
src/
├── app/
│   └── store.ts
├── components/
│   ├── AddTask.tsx
│   └── TaskList.tsx
├── features/
│   └── api/
│       └── apiSlice.ts
├── types.ts
├── App.tsx
└── main.tsx

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

