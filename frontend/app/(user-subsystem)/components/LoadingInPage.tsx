import { SquareLoader } from 'react-spinners';

interface LoadingInPageProps {
  message?: string;
}

export default function LoadingInPage({ message }: LoadingInPageProps) {
    return (
      <div className="m-2">
        {message && <p>{message}</p>}
        <SquareLoader loading={true} color={'#687387'} />
      </div>
    );
}