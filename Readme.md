<!-- remote folder added  -->
- code snippets
- and in webConfig - exposes: {
        "./Product": "./src/Product.jsx"
      },

<!-- host folder added -->

in webConfig added path to - remotes: {
        remote: "remote@http://localhost:3000/remoteEntry.js",
      },

import counter in host -
import Product from "remote/Product"
<Product />

: for react-host
tips: here in this case just like solidJs host simply putting remote and importing from remote works fine , but not with case of react, so instead ->
in remote(folder)/src -> productWrapper.jsx -> 

[//]: # (Framework used:)  Folder:      Framework/Library
                            host        (SolidJs), 
                            remote      (SolidJs)
                            react-host  (ReactJs)

[//]: # (how to run this project)
[//]: # (step1:) open root folder in your favorite IDE

[//]: # (step2:) navigate to each folder through terminal and start every application 
    - To start :
        - run command:  npm install (by navigating to each directory run same command)
                        npm start (if you're using npm)

                       