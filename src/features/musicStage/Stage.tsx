import React, { useContext, useState, useEffect } from "react";
import { useActor } from "@xstate/react";

import classNames from "classnames";
import "./stage.css";
import { Context } from "features/game/GameProvider";

import { sfl2Audio, fitzeeGhostAudio } from "lib/utils/sfx";
import stage from "assets/buildings/New_Stage_SFL.gif";
import fireworks from "assets/decorations/firework.gif";
import { GRID_WIDTH_PX } from "features/game/lib/constants";
import Fitzee from "assets/npcs/Fitzee.gif";
import Romy from "assets/npcs/stage/Romy.gif";
import finalStage from "assets/npcs/stage/FINAL_STAGE_WOOH.gif";
import note from "assets/icons/Note_2.png";
import { Npc } from "./components/Npc";
import { Action } from "components/ui/Action";
import { InnerPanel } from "components/ui/Panel";
import disc from "assets/icons/disc.png";

export default function Stage() {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);
  const [isOpen, setIsOpen] = useState(false);
  const isNotReadOnly = !gameState.matches("readonly");
  const [modalOpen, setModalOpen] = useState(false);
  const [summoned, setSummoned] = useState(false);

  const fireWorks = () => {
    if (isNotReadOnly && !isOpen) {
      setIsOpen(true);
      sfl2Audio.play();
    } else {
      setIsOpen(false);
      sfl2Audio.stop();
    }
  };

  const summon = () => {
    if (isNotReadOnly && !summoned) {
      setSummoned(true);
      fitzeeGhostAudio.play();
    } else {
      setSummoned(false);
      fitzeeGhostAudio.stop();
    }
  };

  const modal = () => {
    if (isNotReadOnly && !modalOpen) {
      setModalOpen(true);
    }
  };

  interface Props {
    text?: string;
    icon: any;
    onClick: () => void;
    className: string;
  }

  const Action2: React.FC<Props> = ({ text, icon, onClick, className }) => {
    return (
      <div
        onClick={onClick}
        className={classNames("cursor-pointer", className)}
        data-html2canvas-ignore="false"
      >
        <div className="absolute w-10 h-10 -left-2 -top-1 flex items-center justify-center">
          <img src={disc} className="w-full absolute inset-0" />
          <img src={icon} className="w-2/3 z-10" />
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        className="z-10 absolute"
        // TODO some sort of coordinate system
        style={{
          width: `${GRID_WIDTH_PX * 5}px`,
          left: `${GRID_WIDTH_PX * 74.75}px`,
          top: `${GRID_WIDTH_PX * 20.5}px`,
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
                transform: "translate(-92px,-450px)",
              }}
              alt="fireworks"
              className="fireworks1"
            />
          )}
          {isOpen && (
            <img
              src={fireworks}
              style={{
                transform: "translate(175px,-750px)",
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
              <Npc img={Romy} message={"i am romy"} X={-3.75} Y={-14} scale={"scale(0.8)"} />
            </div>
          )}
        </div>
      </div>
      <div
        className="z-10 absolute"
        // TODO some sort of coordinate system
        style={{
          width: `${GRID_WIDTH_PX * 6}px`,
          left: `${GRID_WIDTH_PX * 30.23}px`,
          top: `${GRID_WIDTH_PX * 39}px`,
        }}
      >
        <div>
          <Action2 className="relative" icon={note} onClick={summon} />
          {summoned && (
            <Npc
              img={Fitzee}
              message={
                "No matter how much time passes, we appreciate everyone who is part in the Making of SunflowerLand"
              }
              scale={"scale(0.6)"}
              X={-4.73}
              Y={-3.3}
            />
          )}
        </div>
      </div>
    </div>
  );
}
