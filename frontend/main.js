"use strict";

const Router = ReactRouterDOM.BrowserRouter;
const { Route, Link, Redirect } = ReactRouterDOM;

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
      <Route
        path="/actors/"
        exact
        render={props => <PageView {...props} {...baseProps} />}
      />
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
      <Route
        path="/movies/"
        exact
        render={props => <PageView {...props} {...baseProps} />}
      />
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
        <Link to={`/movies/info/${data.id}`}>{data.title}</Link>
      </td>
      <td>{new Date(data.release_date).toDateString()}</td>
    </tr>
  );
}

function ActorRow({ data }) {
  return (
    <tr>
      <td>
        <Link to={`/actors/info/${data.id}`}>{data.first_name}</Link>
      </td>
      <td>
        <Link to={`/actors/info/${data.id}`}>{data.last_name}</Link>
      </td>
    </tr>
  );
}

const ItemsPerPage = 20;

class PageView extends React.Component {
  constructor(props) {
    super(props);

    const { match } = props;

    this.state = {
      items: [],
      hasNext: false,
      page: (match && match.params && match.params.page) || 0
    };
  }

  componentDidMount() {
    const self = this;

    fetch(
      `${this.props.fetchUrl}?offset=${this.state.page *
        ItemsPerPage}&limit=${ItemsPerPage}`
    )
      .then(responce => responce.json())
      .then(items => {
        const hasNext = items.length === ItemsPerPage;
        self.setState({ items, hasNext });
      });
  }

  componentWillReceiveProps(props) {
    const self = this;

    fetch(
      `${this.props.fetchUrl}?offset=${(this.state.page - 1) *
        ItemsPerPage}&limit=${ItemsPerPage}`
    )
      .then(responce => responce.json())
      .then(items => {
        const hasNext = items.length === ItemsPerPage;
        self.setState({ items, hasNext, page: this.state.page - 1 });
      });
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
