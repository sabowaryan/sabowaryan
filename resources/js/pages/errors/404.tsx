import ErrorPage from '../ErrorPage';
import { Head } from '@inertiajs/react';

export default function NotFound() {
  return (
    <>
      <Head title="Page non trouvée - 404" />
      <ErrorPage
        code={404}
        title="Page non trouvée"
        message="Désolé, la page que vous cherchez n'existe pas ou a été déplacée."
      />
    </>
  );
} 