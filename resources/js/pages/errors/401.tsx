import ErrorPage from '../ErrorPage';

export default function Unauthenticated() {
  return (
    <ErrorPage
      code={401}
      title="Non authentifié"
      message="Vous devez être connecté pour accéder à cette page."
    />
  );
} 