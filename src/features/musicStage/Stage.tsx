import React, { useContext, useState, useEffect } from "react";
import { useActor } from "@xstate/react";
 
import classNames from "classnames";
import "./stage.css";
import { Context } from "features/game/GameProvider";

import { sfl2Audio } from "lib/utils/sfx";
import stage from "assets/buildings/New_Stage_SFL.gif";
import fireworks from "assets/decorations/firework.gif";
import { GRID_WIDTH_PX } from "features/game/lib/constants";

import Romy from "assets/npcs/stage/Romy.gif";
import finalStage from "assets/npcs/stage/FINAL_STAGE_WOOH.gif";
import note from "assets/icons/Note_2.png";
import { Npc } from "./components/Npc";
import { Action } from "components/ui/Action";

export default function Stage() {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);
  const [isOpen, setIsOpen] = useState(false);
  const isNotReadOnly = !gameState.matches("readonly");
  const [modalOpen, setModalOpen] = useState(false);

  const fireWorks = () => {
    if (isNotReadOnly && !isOpen) {
      setIsOpen(true);
      sfl2Audio.play();
    } else {
      setIsOpen(false);
      sfl2Audio.stop();
    }
  };

  const modal = () => {
    if (isNotReadOnly && !modalOpen) {
      setModalOpen(true);
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
        <Action
          className="relative "
          text="Stage"
          icon={note}
          onClick={fireWorks}
        />

        <div>
          <img
            src={!isOpen ? stage : finalStage}
            alt="stage"
            style={{
              transform: "scale(2.2)",
              position: "relative",
              zIndex: "-1",
            }}
            className="w-full"
          />
        </div>

        {isOpen && (
          <img
            src={fireworks}
            style={{
              transform: "translate(-75px,-450px)",
            }}
            alt="fireworks"
            className="fireworks1"
          />
        )}
        {isOpen && (
          <img
            src={fireworks}
            style={{
              transform: "translate(195px,-750px)",
            }}
            alt="fireworks"
            className="fireworks1"
          />
        )}
        {isOpen && (
          <div
            style={{
              transform: "translate(80px,-160px)",
              zIndex: "10",
            }}
          >
            <Npc img={Romy} message={"i am romy"} X={-4.25} Y={-15} />
          </div>
        )}
      </div>
    </div>
  );
}
