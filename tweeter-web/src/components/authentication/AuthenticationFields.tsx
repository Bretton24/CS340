interface AuthenticationFieldsProps {
  alias: string;
  password: string;
  setAlias: (alias: string) => void;
  setPassword: (password: string) => void;
  onEnterPress: (event: React.KeyboardEvent<HTMLElement>) => void;
}

const AuthenticationFields = ({alias, password, setAlias, setPassword, onEnterPress}: AuthenticationFieldsProps) => {
   
    return (
        <>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            size={50}
            id="aliasInput"
            placeholder="name@example.com"
            value={alias}
            onKeyDown={onEnterPress}
            onChange={(event) => setAlias(event.target.value)}
          />
          <label htmlFor="aliasInput">Alias</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control bottom"
            id="passwordInput"
            placeholder="Password"
            value={password}
            onKeyDown={onEnterPress}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label htmlFor="passwordInput">Password</label>
        </div>
      </>
    )
}

export default AuthenticationFields;