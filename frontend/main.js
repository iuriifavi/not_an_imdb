"use strict";

const Router = ReactRouterDOM.BrowserRouter;
const { Route, Link, Redirect, Switch } = ReactRouterDOM;

function Home() {
  return (
    <div>
      <h2>Welcome to Not IMDB</h2>
      <h5>Chose Actors or Movies to start...</h5>
    </div>
  );
}

function Actors() {
  const baseProps = {
    baseUrl: "/actors",
    fetchUrl: "/api/actor",
    header: ActorTableHeader,
    rowView: ActorRow
  };

  return (
    <div>
      <h3>Actors</h3>
      <Switch>
        <Route path="/actors/:actorId/info" exact component={ActorPreview} />
        <Route path="/actors/:actorId/edit" exact component={ActorEdit} />
        <Route path="/actors/"
          render={props => <PageView {...props} {...baseProps} />}
        />
      </Switch>
    </div>
  );
}

function Movies() {
  const baseProps = {
    baseUrl: "/movies",
    fetchUrl: "/api/movie",
    header: MovieTableHeader,
    rowView: MovieRow
  };

  return (
    <div>
      <h3>Movies</h3>
      <Switch>
        <Route path="/movies/:actorId/info" exact component={MoviePreview} />
        <Route path="/movies/:actorId/edit" exact component={MovieEdit} />
        <Route path="/movies/"
          render={props => <PageView {...props} {...baseProps} />}
        />
      </Switch>
    </div>
  );
}

function MovieTableHeader() {
  return (
    <thead>
      <tr>
        <th scope="col">Tile</th>
        <th scope="col">Release Date</th>
      </tr>
    </thead>
  );
}

function ActorTableHeader() {
  return (
    <thead>
      <tr>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
      </tr>
    </thead>
  );
}

function MovieRow({ data }) {
  return (
    <tr>
      <td>
        <Link to={`/movies/${data.id}/info/`}>{data.title}</Link>
      </td>
      <td>{new Date(data.release_date).toDateString()}</td>
    </tr>
  );
}

function ActorRow({ data }) {
  return (
    <tr>
      <td>
        <Link to={`/actors/${data.id}/info/`}>{data.first_name}</Link>
      </td>
      <td>
        <Link to={`/actors/${data.id}/info/`}>{data.last_name}</Link>
      </td>
    </tr>
  );
}

const ItemsPerPage = 20;

class PageView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      hasNext: false,
      page: 0
    };
  }

  fetchData(props) {
    const self = this;
    const { match } = props;
    const page = (match && match.params && match.params.page) || 0;

    fetch(
      `${this.props.fetchUrl}?offset=${page * ItemsPerPage}&limit=${ItemsPerPage}`
    )
      .then(responce => responce.json())
      .then(items => {
        const hasNext = items.length === ItemsPerPage;
        self.setState({ items, hasNext, page });
      });
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchData(props)
  }

  render() {
    const prevPageNum = Math.max(+this.state.page - 1 || 0, -1);
    const nextPageNum = +this.state.page + 1 || 1;
    const prev = prevPageNum >= 0 && (
      <Link to={`${this.props.baseUrl}/${prevPageNum}`}>Prev</Link>
    );
    const next = this.state.hasNext && (
      <Link to={`${this.props.baseUrl}/${nextPageNum}`}>Next</Link>
    );

    const RowView = this.props.rowView;
    const Header = this.props.header;

    return (
      <div>
        <table className="table">
          <Header></Header>
          <tbody>
            {this.state.items.map(item => (
              <RowView data={item} key={item.id} />
            ))}
          </tbody>
        </table>
        {prev}
        {next}
      </div>
    );
  }
}

class ActorPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { actor: null }
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchData(props)
  }

  fetchData(props) {
    const self = this;
    const { match } = props;
    const actorId = match.params.actorId;

    fetch(
      `/api/actor/${actorId}/info`
    )
      .then(responce => responce.json())
      .then( actor => {
        self.setState({ actor });
      });
  }

  render() { return ( <h1>Actor Info {JSON.stringify(this.state.actor)}</h1> ); }
}

class MoviePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { actor: null }
  }

  componentDidMount() {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchData(props)
  }

  fetchData(props) {
    const self = this;
    const { match } = props;
    const actorId = match.params.actorId;

    fetch(
      `/api/movie/${actorId}/info`
    )
      .then(responce => responce.json())
      .then( actor => {
        self.setState({ actor });
      });
  }

  render() { return ( <h1>Movie Info {JSON.stringify(this.state.actor)}</h1> ); }
}

class ActorEdit extends React.Component {
  render() { return ( <h1>Actor Edit</h1> ); }
}

class MovieEdit extends React.Component {
  render() { return ( <h1>Movie Edit</h1> ); }
}

/**
 * @description Need to use external handle for proper menu closing
 */
function Menu() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Not at IMDB!
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/movies/">
              Movies
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/actors/">
              Actors
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function MainElement() {
  return (
    <Router>
      <div>
        <Menu />
        <div className="container">
          <Route path="/" exact component={Home} />
          <Route path="/movies/" component={Movies} />
          <Route path="/actors/" component={Actors} />
        </div>
      </div>
    </Router>
  );
}

const domContainer = document.querySelector("#root");
ReactDOM.render(<MainElement />, domContainer);
