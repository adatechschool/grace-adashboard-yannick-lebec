import { Remove } from "./Remove"

export function Themes({event, removeTheme}){
    
  
    return (
        <div className="theme-header">
            <h1 className="title">{event.name}</h1>

            <Remove event={event} removeTheme={removeTheme}/>
          </div>
    )
}