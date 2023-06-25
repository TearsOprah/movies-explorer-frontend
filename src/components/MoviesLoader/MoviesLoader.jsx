import './MoviesLoader.css'
export default function MoviesLoader({ onClick }) {
  return (
    <div className={'movies-loader'}>
      <button onClick={onClick} className={'movies-loader__button animation-transition hovered-button'}>Ещё</button>
    </div>
  )
}
