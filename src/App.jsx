import "./App.css"
import { useState } from "react"

export const App = () => {
const [newJoke, setNewJoke] = useState("")

const handleStateChange = () => {
  setNewJoke(newJoke)
  console.log(newJoke)
}

  return <div className="joke-add-form">
  <input
    className="joke-input"
    type="text"
    placeholder="New One Liner"
    onChange= {handleStateChange}
  />

  </div>

}


