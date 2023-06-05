import './Main.css'
import Header from "../Header/Header";
import NavTab from "../NavTab/NavTab";

export default function Main() {

  return (
    <main className={'main'}>
      <Header>
        <NavTab />
      </Header>
      <h1>Main</h1>
    </main>
  )
}
