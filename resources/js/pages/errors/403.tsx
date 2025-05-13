import ErrorPage from '../ErrorPage';

export default function Forbidden() {
  return (
    <ErrorPage
      code={403}
      title="Accès refusé"
      message="Vous n'avez pas la permission d'accéder à cette page."
    />
  );
} 