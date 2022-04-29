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
import chicken from "assets/npcs/stage/Dev_Chicken.gif";
import spencer from "assets/npcs/stage/Dev_Spencer.gif";
import adam from "assets/npcs/stage/Dev_Blue_Shirt.gif";
import brown from "assets/npcs/stage/Dev_Brown_Shirt.gif";
import { Npc } from "./components/Npc";
import { Modal } from "react-bootstrap";

const NPC_LIST = [
  {
    message: "I am the devtest0",
  },
  {
    message: "I am chicken",
  },
  {
    message: "i am adam",
  },
  {
    message: "I am spencer",
  },
  {
    message: "i am steve",
  },
];

export default function Stage() {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);
  const [isOpen, setIsOpen] = useState(false);
  const isNotReadOnly = !gameState.matches("readonly");
  const [modalOpen, setModalOpen] = useState(false);

  const fireWorks = () => {
    if (isNotReadOnly && !isOpen) {
      setIsOpen(true);
      surpriseAudio.play();
    } else {
      setIsOpen(false);
      surpriseAudio.stop();
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
        <div onClick={fireWorks}>
          <img
            src={stage}
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
          <div
            style={{
              transform: "translate(80px,-160px)",
              zIndex: "10",
            }}
          >
            <Npc img={Romy} message={"i am romy"} X={-4.25} Y={-15} />
            <Npc
              img={devtest}
              message={NPC_LIST[0].message}
              X={-2.25}
              Y={-13}
            />
            <Npc img={chicken} message={NPC_LIST[1].message} X={-7} Y={-12.7} />
            <Npc img={adam} message={NPC_LIST[2].message} X={-3.5} Y={-11.8} />
            <Npc img={brown} message={NPC_LIST[3].message} X={-6} Y={-11} />
            <Npc img={spencer} message={NPC_LIST[4].message} X={-2} Y={-11} />
          </div>
        )}
      </div>
    </div>
  );
}
