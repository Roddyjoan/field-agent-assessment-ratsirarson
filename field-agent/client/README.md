# React Field Agent Assessment
## Tasks
_TODO_ Add time estimates to each of the top-level tasks
* [x] Create a new GitHub repo for this assessment or continue working in the repo from last week's Field Agent API repository (#.# hours)
  * [x] **When creating your repo, be sure to add a `.gitignore` file using the GitHub Node template**
  * [x] Update the README with the contents from this file
  * [x] Add the instruction team as collaborators
* [ ] Review the requirements (#.# hours)
* [ ] Identify any research that I need to do (#.# hours)
### Part 1: Project Setup and Agents List
* [x] Create a new React project with CRA (create-react-app)
  * [x] Remove the cruft (refer back to the Components and JSX exercise for instructions)
* [x] Add Bootstrap to the `public/index.html` file
  * [x] Add a link to the Bootstrap CSS using the [CDN from the official docs](https://getbootstrap.com/docs/4.6/getting-started/introduction/#css)
  * [x] Add the [`container` CSS class](https://getbootstrap.com/docs/4.6/layout/overview/#containers) to the `<div id="root"></div>` element
* [x] Create `Agents` component (stub)
  * [x] Update `App` component to render `Agents`
* [x] Update `Agents` to render list of agents
  * [x] Use `fetch` to `GET` a list of agents from the Field Agent API when the component is first loaded
  * [ ] Write JSX to render the agents array
  * [ ] Stub out click event handlers ("Add Agent", "Edit Agent", "Delete Agent") as necessary
**Make sure that my GitHub repo is updated!**
### Part 2: Add Agent and Delete Agent
* [x] Create a form to add an agent
<!-- FIRST NAME LAST NAME DOB HEIGHT IN INCHES ARE THE ONLY THINGS REQUIRED --->
  * [x] Add form JSX
  * [x] Decide between using individual state variables for input elements or a single object
  * [x] Add onChange event handlers to input elements
  * [x] Add onSubmit event handler to form element (be sure to prevent the form from submitting!)
  * [x] Create agent object
  * [x] Use `fetch` to `POST` the new agent's information to the Field Agent API
  * [x] On success, update the agents array (don't modify the original array!), or on failure, display any validation errors from the API in the UI
* [x] Support deleting agents
  * [x] Store the "delete agent ID" in a new state variable
  * [x] Retrieve the agent to delete
  * [x] Update form state variable(s)
  * [x] Add delete confirmation JSX
  * [x] Add button click handler to perform the delete
  * [x] Use `fetch` to `DELETE` the agent from the Field Agent API
  * [x] On success, update the agents array (don't modify the original array!)
* [x] Conditionally render sections of the component
  * [x] Add state variable to track the current view
  * [x] Add conditional logic to the JSX to display the appropriate view
**Make sure that my GitHub repo is updated!**
### Part 3: Edit Agent
* [x] Support editing agents
  * [x] Store the "edit agent ID" in a new state variable
  * [x] Retrieve the agent to edit
  * [x] Update form state variable(s)
  * [x] Add form JSX
  * [x] Add onChange event handlers to input elements
  * [x] Add onSubmit event handler to form element (be sure to prevent the form from submitting!)
  * [x] Create agent object
  * [x] Use `fetch` to `PUT` the updated agent's information to the Field Agent API
  * [x] On success, update the agents array (don't modify the original array!), or on failure, display any validation errors from the API in the UI
* [ ] Apply Bootstrap styling (as needed)
  * [ ] Update the agents list
  * [ ] Update the add agent form
  * [ ] Update the edit agent form
  * [ ] Update the delete agent confirmation
* [ ] Use the provided test plan to manually test the application
**Make sure that my GitHub repo is updated!**
## High-Level Requirements
Implement a full CRUD UI for agents.
* Display all agents
* Add an agent
* Update an agent
* Delete an agent
## Technical Requirements
* Use Create React App
* Use `fetch` for async HTTP
* You are not allowed to change the Field Agent HTTP Service or database (unless there's a confirmed bug and your instructor approves)
* Use a CSS framework