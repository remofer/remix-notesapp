import { json, redirect } from '@remix-run/node';

import { 
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError 
} from '@remix-run/react';

import NewNote, {links as NewNoteLinks} from '~/components/NewNote'
import NoteList, {links as noteListLinks} from '~/components/NoteList';
import { getStoredNotes, storeNotes } from '../data/note';


export default function NotesPage()  {
  const notes = useLoaderData();
  return (
    <main>
      <NewNote/>
      <NoteList notes={notes}/>
    </main>
  );
};

export async function loader() {
  const notes = await getStoredNotes()
  if(!notes || notes.length === 0 ){
      throw json(
        {message: 'Could not find any notes.'},
        {status: 404, statusText: 'Not found'}
    );
  }
  return notes;
};

export async function action({request}) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData)

  if (noteData.title.trim().length < 5) {
    return {message: 'Invalid title - must  be at  least 5 characters long.'}
  }
  // {
  //   title: formData.get('title'),
  //   content: formData.get('content')
  // }
  //*Añadir validaciones

  const existingNotes = await getStoredNotes()
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes)
  return redirect('/notes')
}

export function links() {
  return [...NewNoteLinks(),...noteListLinks()];
}

export function meta() {
  return {
    title: 'All notes',
    description: 'Manage your notes with ease.'
  };
}


export const ErrorBoundary = ({error}) => {
  const routeError = useRouteError();
  const message = routeError.message || 'Oops! Something went wrong.';

  if (isRouteErrorResponse(routeError)) {
    return (
      <main className="info-message">
        <NewNote />
        <h1>Oops</h1>
        <p>Status: {routeError.status}</p>
        <p>{routeError.data?.message}</p>
      </main>
    );
  }

  return (
    <main className="error">
      <h1>An error related ocurred!</h1>
      <p>{message}</p>
      <p>Back to <Link to="/">safety!</Link> </p>
    </main>
  );
}
