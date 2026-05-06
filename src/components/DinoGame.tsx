import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Gamepad2 } from 'lucide-react';

interface DinoGameProps {
  isOpen: boolean;
  onClose: () => void;
}

const GRAVITY = 0.6;
const JUMP_FORCE = -10;
const GROUND_Y = 150;
const GAME_SPEED = 4;

const DinoGame = ({ isOpen, onClose }: DinoGameProps) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [dinoY, setDinoY] = useState(GROUND_Y);
  const [, setDinoVel] = useState(0);
  const [obstacles, setObstacles] = useState<number[]>([400]);
  const frameRef = useRef<number>(0);
  const dinoRef = useRef({ y: GROUND_Y, vel: 0 });
  const obstaclesRef = useRef([400]);
  const scoreRef = useRef(0);

  const jump = useCallback(() => {
    if (!gameStarted) {
      setGameStarted(true);
      setGameOver(false);
      setScore(0);
      scoreRef.current = 0;
      dinoRef.current = { y: GROUND_Y, vel: JUMP_FORCE };
      obstaclesRef.current = [400];
      return;
    }
    if (dinoRef.current.y >= GROUND_Y - 1) {
      dinoRef.current.vel = JUMP_FORCE;
    }
  }, [gameStarted]);

  useEffect(() => {
    if (!isOpen || !gameStarted || gameOver) return;

    const loop = () => {
      const d = dinoRef.current;
      d.vel += GRAVITY;
      d.y = Math.min(d.y + d.vel, GROUND_Y);
      setDinoY(d.y);

      const obs = obstaclesRef.current.map((x) => x - GAME_SPEED);
      if (obs[0] < -20) {
        obs.shift();
        scoreRef.current += 1;
        setScore(scoreRef.current);
      }
      if (obs.length === 0 || obs[obs.length - 1] < 250) {
        obs.push(400 + Math.random() * 100);
      }
      obstaclesRef.current = obs;
      setObstacles([...obs]);

      // Collision
      for (const ox of obs) {
        if (ox > 20 && ox < 55 && d.y > GROUND_Y - 15) {
          setGameOver(true);
          setGameStarted(false);
          return;
        }
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isOpen, gameStarted, gameOver]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, jump]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-vsc-editor border border-border rounded-lg p-4 w-[440px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-foreground font-code flex items-center gap-2">
            <Gamepad2 size={16} strokeWidth={1.5} /> Dino Game
          </span>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>

        <div
          className="relative bg-vsc-titlebar rounded border border-border overflow-hidden cursor-pointer"
          style={{ width: 400, height: 200 }}
          onClick={jump}
        >
          {/* Ground */}
          <div className="absolute bottom-5 left-0 right-0 h-px bg-muted-foreground" />

          {/* Dino */}
          <div
            className="absolute text-2xl transition-none"
            style={{ left: 30, top: dinoY, transform: 'translateY(-100%)' }}
          >
            ▲
          </div>

          {/* Obstacles */}
          {obstacles.map((x, i) => (
            <div
              key={i}
              className="absolute text-lg text-vsc-green"
              style={{ left: x, bottom: 20 }}
            >
              ║
            </div>
          ))}

          {/* Score */}
          <div className="absolute top-2 right-3 font-code text-xs text-muted-foreground">
            Score: {score}
          </div>

          {/* Instructions */}
          {!gameStarted && !gameOver && (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm font-code">
              Press Space or Click to Start
            </div>
          )}
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-foreground text-sm font-code">Game Over! Score: {score}</span>
              <span className="text-muted-foreground text-xs mt-1">Click or press Space to restart</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DinoGame;
