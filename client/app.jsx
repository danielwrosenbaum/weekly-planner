import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parse-route';
import PageContainer from './components/page-container';
import AddEntry from './pages/add-entry';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '' || route.path === 'home') {
      return <Home />;
    }
    if (route.path === 'add-entry') {
      return <AddEntry />;
    }
  }

  render() {
    return (
      <PageContainer>
        {this.renderPage()}
      </PageContainer>
    );
  }
}
