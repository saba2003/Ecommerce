import { useParams } from 'react-router-dom';

// Higher-Order Component (HOC) that injects `useParams`
function withRouter(Component) {
  return function (props) {
    const params = useParams(); // Get URL params using `useParams`
    return <Component {...props} params={params} />;
  };
}

export default withRouter;