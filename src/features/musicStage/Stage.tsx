import React, { useContext, useState, useEffect } from "react";
import { useActor } from "@xstate/react";

import classNames from "classnames";
import "./stage.css";
import { Context } from "features/game/GameProvider";

import { surpriseAudio } from "lib/utils/sfx";
import stage from "assets/buildings/New_Stage_SFL.gif";
import fireworks from "assets/decorations/firework.gif";
import { GRID_WIDTH_PX } from "features/game/lib/constants";

import Romy from "assets/npcs/stage/Romy.gif";
import devtest from "assets/npcs/stage/devtest.gif";

type Props = {};

export default function Stage() {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);
  const [isOpen, setIsOpen] = useState(false);
  const isNotReadOnly = !gameState.matches("readonly");

  const fireWorks = () => {
    if (isNotReadOnly && !isOpen) {
      setIsOpen(true);
      surpriseAudio.play();
    } else {
      setIsOpen(false);
      surpriseAudio.stop();
    }
  };

  return (
    <div
      className="z-10 absolute"
      // TODO some sort of coordinate system
      style={{
        width: `${GRID_WIDTH_PX * 6}px`,
        left: `${GRID_WIDTH_PX * 29.8}px`,
        top: `${GRID_WIDTH_PX * 28}px`,
      }}
    >
      <div
        className={classNames({
          "cursor-pointer": isNotReadOnly,
          "hover:img-highlight": isNotReadOnly,
        })}
      >
        <div onClick={fireWorks}>
          <img
            src={stage}
            alt="stage"
            style={{ transform: "scale(2)", position: "relative", zIndex: 2 }}
            className="w-full"
          />

          <img
            src={Romy}
            alt=""
            style={{
              transform: "scale(0.6)",
              position: "relative",
              top: "-200px",
              left: "60px",
              zIndex: 2,
            }}
          />
        </div>

        {isOpen && (
          <img
            src={fireworks}
            style={{
              transform: "translate(-70px,-450px)",
            }}
            alt="fireworks"
            className="fireworks1"
          />
        )}
        {isOpen && (
          <img
            src={fireworks}
            style={{
              transform: "translate(190px,-750px)",
            }}
            alt="fireworks"
            className="fireworks1"
          />
        )}
        {isOpen && (
          <img
            src={devtest}
            style={{
              transform: "translate(60px,-160px), scale(0.7)",
            }}
            id="steve"
            alt="steve"
          />
        )}
      </div>
    </div>
  );
}
