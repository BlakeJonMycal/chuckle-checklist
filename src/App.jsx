import "./App.css"
import { useState, useEffect } from "react"
import { postJoke, getAllJokes, updateJokeTold, deleteJoke } from "./services/jokeList.js"

export const App = () => {
  const [newJoke, setNewJoke] = useState("")
  const [allJokes, setAllJokes] = useState([])
  const [showToldJokes, setShowToldJokes] = useState([])
  const [showUntoldJokes, setShowUntoldJokes] = useState([])

  const changeToldValue = (JokeObject) => {
    JokeObject.told = !JokeObject.told
    updateJokeTold(JokeObject.id, JokeObject).then(() => {
      render()
    })
  }
  const deleteJokeFromDatabase = (JokeObject) => {
    deleteJoke(JokeObject.id, JokeObject).then(() => {
      render()
    } )
  }

  const render = () => {
    getAllJokes().then((jokeArr) => {
      setAllJokes(jokeArr)
    })
  }
  useEffect(() => {
    render()
    console.log("All Jokes Set")
  }, [])

  useEffect(() => {
    const toldJokes = allJokes.filter(
      (joke) => joke.told === true
    )
    setShowToldJokes(toldJokes)
  }, [allJokes])

  useEffect(() => {
    const untoldJokes = allJokes.filter(
      (joke) => joke.told === false
    )
    setShowUntoldJokes(untoldJokes)
  }, [allJokes])

  return (
    <div className="app-container">
      <div className="app-heading">
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
      <h2>Add Joke</h2>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={newJoke}
          onChange={(event) => {
            setNewJoke(event.target.value)
            //console.log (newJoke)
          }}
        />
       
          <button className="joke-input-submit"
            onClick={() => {
              const defaultState = {
                "text": newJoke,
                "told": false
              }

              postJoke(defaultState).then(() => {
                render()
                setNewJoke("")
              })
            }}>Add</button>
        
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>Told <span className = "told-count">{showToldJokes.length}</span></h2>
          {showToldJokes.map((toldJoke) => {
            return (
              <section className="joke-list-item" key={toldJoke.id}>
                <p className="joke-list-item-text">{toldJoke.text}</p>
                <div className = "joke-list-action-delete"><button className = "" onClick = {() => {
                    deleteJokeFromDatabase(toldJoke)
                    render()
                  }}>delete</button></div>
                  <div className = "joke-list-action-toggle"><button className="" onClick={() => {
                    changeToldValue(toldJoke)
                    render()
                  }}
                  >toggle</button></div>
                
              </section>
            )
          })}
        </div>
        <div className="joke-list-container">
          <h2>Untold<span className = "untold-count">{showUntoldJokes.length}</span></h2>
          {showUntoldJokes.map((untoldJoke) => {
            return (
              <section className="joke-list-item" key={untoldJoke.id}>
                <p className="joke-list-item-text">{untoldJoke.text}</p>
                <div className = "joke-list-action-delete"><button className = "" onClick = {() => {
                    deleteJokeFromDatabase(untoldJoke)
                    render()
                  }}>delete</button></div>
                  <div className = "joke-list-action-toggle"><button className="" onClick={() => {
                    changeToldValue(untoldJoke)
                    render()
                  }}
                  >toggle</button></div>
                
              </section>
            )
          })}
        </div>
      </div>
    </div>)
}

