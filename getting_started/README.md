# Installation

To get started with Motion Canvas, follow the steps below:

## 1. Download Node.js

Node.js is required to execute server-side JavaScript and also installs the npm package manager. You can download and install Node.js by following the instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## 2. Install TypeScript (Optional)

Motion Canvas can be used with either JavaScript or TypeScript. If you choose to use TypeScript, you can install it using npm by running the following command:

```shell
npm install typescript
```

Please note that this step is optional. If you prefer to use JavaScript, you can skip this step.

## 3. Create a New Project

To create a new Motion Canvas project, follow these steps:

1. Visit the [Motion Canvas Quickstart Guide](https://motioncanvas.io/docs/quickstart/) for an in-depth walkthrough on getting started.

2. Open your terminal and run the following command to create a project folder:

```shell
npm init @motion-canvas
```

This command will prompt you to provide a name for your project and choose a language (TypeScript or JavaScript).

3. Navigate to the project folder by running the following command in the terminal:

```shell
cd project_name
```

Replace `project_name` with the name you provided in the previous step.

4. Download dependencies using npm using the following command in the terminal:

```shell
npm install
```

5. Start the server that hosts the animation editor by running the following command in the terminal:

```shell
npm run serve
```

This will start the server and the animation editor will be accessible at `localhost:port` or `0.0.0.0:port`.

That's it! You have successfully installed and set up Motion Canvas for your project.