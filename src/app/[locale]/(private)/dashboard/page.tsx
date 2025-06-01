import {auth} from '@/auth';
import {Container} from '@mui/material';
import {redirect} from 'next/navigation';
import PageBody from './PageBody';

const DashboardPage = () => {
  const session = auth();

  if (!session) {
    redirect('/');
  }

  return (
    <Container maxWidth="lg" sx={{py: 10}}>
      <PageBody />
    </Container>
  );
};

export default DashboardPage;
