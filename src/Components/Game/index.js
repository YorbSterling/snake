import React, { Component } from "react";
import Display from "./Display";

const A = 65;
const W = 87;
const D = 68;
const S = 83;
const SPACE = 32;
const BOARD_SIZE = 30;
const START = 15;

class Game extends Component {
    constructor() {
        super();

        this.state = {
            isRunning: false,
            isGameOver: false,
            pixelRows: [],
            snake: [[START, START - 2], [START, START - 1], [START, START]],
            snakeSpeed: 100,
            previousDirection: [0, 1],
            direction: [0, 1],
            food: [START - 5, BOARD_SIZE - 4]
        };
    }

    _set_snake = (snake, pixelRows) => {
        for (var i = 0; i < this.state.snake.length; i++) {
            pixelRows[snake[i][0]][snake[i][1]].type = "snake";
        }

        return pixelRows;
    };

    _move_snake = () => {
        if (this.state.isRunning && !this.state.isGameOver) {
            const direction = this.state.direction;
            let pixelRows = this.state.pixelRows;
            let snake = this.state.snake;
            let head = [snake[snake.length - 1][0], snake[snake.length - 1][1]];
            let tail = snake[0];
            let isGameOver = false;

            head[0] += direction[0];
            head[1] += direction[1];

            if (head[0] > BOARD_SIZE - 1 || head[0] < 0 || head[1] > BOARD_SIZE - 1 || head[1] < 0) {
                this.setState({
                    isGameOver: true
                });
            } else {
                switch (pixelRows[head[0]][head[1]].type) {
                    case "empty":
                        snake.shift();
                        snake.push(head);
                        pixelRows[tail[0]][tail[1]].type = "empty";
                        pixelRows[head[0]][head[1]].type = "snake";
                        break;
                    case "snake":
                        isGameOver = true;
                        break;
                    default:
                        snake.push(head);
                        pixelRows[head[0]][head[1]].type = "snake";
                        let foodPosition = this._food_position(pixelRows);
                        pixelRows[foodPosition[0]][foodPosition[1]].type = "food";
                        break;
                }

                this.setState({
                    snake,
                    isGameOver,
                    pixelRows,
                    previousDirection: this.state.direction
                });
            }
        }
    };

    _food_position = pixelRows => {
        let y = 0;
        let x = 0;

        do {
            y = Math.floor(Math.random() * BOARD_SIZE);
            x = Math.floor(Math.random() * BOARD_SIZE);
        } while (pixelRows[y][x].type != "empty");
        return [y, x];
    };

    _handleKeyDown = event => {
        let direction = this.state.direction;
        let previousDirection = this.state.previousDirection;

        switch (event.keyCode) {
            case A:
                if (previousDirection[1] != 1) direction = [0, -1];
                this.setState({
                    direction
                });
                break;
            case W:
                if (previousDirection[0] != 1) direction = [-1, 0];
                this.setState({
                    direction
                });
                break;
            case D:
                if (previousDirection[1] != -1) direction = [0, 1];
                this.setState({
                    direction
                });
                break;
            case S:
                if (previousDirection[0] != -1) direction = [1, 0];
                this.setState({
                    direction
                });
                break;
            case SPACE:
                this.setState(
                    {
                        isRunning: this.state.isGameOver ? false : !this.state.isRunning
                    },
                    () => {
                        this._move_snake();
                    }
                );
                break;
            default:
                break;
        }
    };

    componentWillMount() {
        document.addEventListener("keydown", this._handleKeyDown.bind(this));
    }

    componentDidMount() {
        const pixelRows = this.state.pixelRows;
        const snake = this.state.snake;

        for (var i = 0; i < BOARD_SIZE; i++) {
            let row = [];
            for (var j = 0; j < BOARD_SIZE; j++) {
                if (i === this.state.food[0] && j === this.state.food[1]) {
                    row.push({ type: "food", size: "large" });
                } else {
                    row.push({ type: "empty", size: "large" });
                }
            }
            pixelRows.push(row);
        }

        this.setState(
            {
                pixelRows: this._set_snake(snake, pixelRows)
            },
            () => {
                setInterval(() => {
                    this._move_snake();
                }, this.state.snakeSpeed);
            }
        );
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this._handleKeyDown.bind(this));
    }

    render() {
        return this.state.isGameOver ? <div>Game Over</div> : <Display pixelRows={this.state.pixelRows} />;
    }
}

export default Game;
