import React, { useState } from "react";
import {
  BedDouble,
  Sofa,
  Table2,
  Armchair,
  Lamp,
  Trash2,
  RotateCw,
  Move,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  Plus,
  Minus,
  MousePointer2,
} from "lucide-react";

const furnitureLibrary = [
  {
    id: "bed",
    name: "Bed",
    icon: BedDouble,
    width: 180,
    height: 100,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    id: "sofa",
    name: "Sofa",
    icon: Sofa,
    width: 180,
    height: 80,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    id: "table",
    name: "Table",
    icon: Table2,
    width: 120,
    height: 90,
    color: "bg-amber-100 text-amber-600",
  },
  {
    id: "chair",
    name: "Chair",
    icon: Armchair,
    width: 70,
    height: 70,
    color: "bg-rose-100 text-rose-600",
  },
  {
    id: "lamp",
    name: "Lamp",
    icon: Lamp,
    width: 50,
    height: 50,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function RoomDesigner({
  roomType = "Bedroom",
  roomLength = 15,
  roomWidth = 12,
}) {
  const [furniture, setFurniture] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [zoom, setZoom] = useState(100);

  const selectedFurniture = furniture.find(
    (item) => item.instanceId === selectedId
  );

  // Add furniture to canvas
  const addFurniture = (item) => {
    const newFurniture = {
      ...item,
      instanceId: `${item.id}-${Date.now()}`,
      x: 100 + furniture.length * 20,
      y: 80 + furniture.length * 20,
      rotation: 0,
    };

    setFurniture((prev) => [...prev, newFurniture]);
    setSelectedId(newFurniture.instanceId);
  };

  // Drag furniture
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("furnitureId", item.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const furnitureId = e.dataTransfer.getData("furnitureId");
    const item = furnitureLibrary.find((f) => f.id === furnitureId);

    if (!item) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left - item.width / 2;
    const y = e.clientY - rect.top - item.height / 2;

    const newFurniture = {
      ...item,
      instanceId: `${item.id}-${Date.now()}`,
      x,
      y,
      rotation: 0,
    };

    setFurniture((prev) => [...prev, newFurniture]);
    setSelectedId(newFurniture.instanceId);
  };

  // Delete selected item
  const deleteSelected = () => {
    setFurniture((prev) =>
      prev.filter((item) => item.instanceId !== selectedId)
    );

    setSelectedId(null);
  };

  // Rotate selected item
  const rotateSelected = () => {
    setFurniture((prev) =>
      prev.map((item) =>
        item.instanceId === selectedId
          ? {
              ...item,
              rotation: (item.rotation + 15) % 360,
            }
          : item
      )
    );
  };

  // Update selected property
  const updateProperty = (property, value) => {
    setFurniture((prev) =>
      prev.map((item) =>
        item.instanceId === selectedId
          ? {
              ...item,
              [property]: Number(value),
            }
          : item
      )
    );
  };

  return (
    <div className="h-screen overflow-hidden bg-slate-100 text-slate-900">
      {/* Top Navbar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5">
        <div className="flex items-center gap-4">
          <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <ChevronLeft size={21} />
          </button>

          <div>
            <h1 className="text-sm font-bold sm:text-base">
              AI Room Designer
            </h1>

            <p className="text-xs text-slate-400">
              {roomType} · {roomLength} × {roomWidth} ft
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            onClick={() => setZoom((z) => Math.max(50, z - 10))}
            className="rounded-lg border border-slate-200 bg-white p-2 hover:bg-slate-50"
          >
            <Minus size={16} />
          </button>

          <span className="min-w-12 text-center text-sm font-medium">
            {zoom}%
          </span>

          <button
            onClick={() => setZoom((z) => Math.min(150, z + 10))}
            className="rounded-lg border border-slate-200 bg-white p-2 hover:bg-slate-50"
          >
            <Plus size={16} />
          </button>
        </div>
      </header>

      {/* Dashboard */}
      <div className="grid h-[calc(100vh-64px)] grid-cols-1 lg:grid-cols-[230px_minmax(0,1fr)_280px]">
        {/* LEFT SIDEBAR */}
        <aside className="hidden border-r border-slate-200 bg-white lg:block">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-bold">Furniture Library</h2>

            <p className="mt-1 text-xs text-slate-400">
              Drag or click an item
            </p>
          </div>

          <div className="space-y-2 p-4">
            {furnitureLibrary.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onClick={() => addFurniture(item)}
                  className="group flex cursor-grab items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-indigo-300 hover:bg-indigo-50 active:cursor-grabbing"
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.color}`}
                  >
                    <Icon size={21} />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold">{item.name}</p>

                    <p className="text-[11px] text-slate-400">
                      {item.width} × {item.height}
                    </p>
                  </div>

                  <Move
                    size={15}
                    className="text-slate-300 group-hover:text-indigo-500"
                  />
                </div>
              );
            })}
          </div>

          <div className="mx-4 mt-3 rounded-xl bg-indigo-50 p-4">
            <div className="flex gap-2">
              <MousePointer2
                size={17}
                className="mt-0.5 text-indigo-600"
              />

              <div>
                <p className="text-xs font-semibold text-indigo-700">
                  Quick Tip
                </p>

                <p className="mt-1 text-[11px] leading-4 text-indigo-600">
                  Drag furniture onto the canvas to arrange your room.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* CENTER CANVAS */}
        <main className="relative flex min-h-0 items-center justify-center overflow-auto bg-slate-100 p-5 sm:p-10">
          <div
            className="relative shrink-0 border-[8px] border-white bg-white shadow-2xl shadow-slate-300"
            style={{
              width: `${roomLength * 45}px`,
              height: `${roomWidth * 45}px`,
              maxWidth: "85vw",
              maxHeight: "75vh",
              transform: `scale(${zoom / 100})`,
              transformOrigin: "center",
              backgroundImage: `
                linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
              `,
              backgroundSize: "45px 45px",
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => setSelectedId(null)}
          >
            {/* Room Label */}
            <div className="absolute left-3 top-3 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-500 shadow-sm backdrop-blur">
              {roomLength} ft × {roomWidth} ft
            </div>

            {/* Furniture */}
            {furniture.map((item) => {
              const Icon = item.icon;
              const isSelected = item.instanceId === selectedId;

              return (
                <div
                  key={item.instanceId}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(item.instanceId);
                  }}
                  className={`absolute flex cursor-pointer items-center justify-center rounded-xl border-2 transition ${
                    isSelected
                      ? "border-indigo-500 bg-indigo-50 shadow-lg shadow-indigo-200"
                      : "border-slate-300 bg-white/90 shadow-md"
                  }`}
                  style={{
                    width: item.width,
                    height: item.height,
                    left: item.x,
                    top: item.y,
                    transform: `rotate(${item.rotation}deg)`,
                  }}
                >
                  <div className="text-center">
                    <Icon
                      size={30}
                      className={
                        isSelected
                          ? "mx-auto text-indigo-600"
                          : "mx-auto text-slate-500"
                      }
                    />

                    <span className="mt-1 block text-[10px] font-semibold text-slate-500">
                      {item.name}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Empty Canvas */}
            {furniture.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                    <Plus className="text-slate-400" />
                  </div>

                  <p className="text-sm font-semibold text-slate-500">
                    Drop furniture here
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Start building your room layout
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden overflow-y-auto border-l border-slate-200 bg-white lg:block">
          <div className="border-b border-slate-100 p-5">
            <h2 className="font-bold">Properties</h2>

            <p className="mt-1 text-xs text-slate-400">
              Customize selected furniture
            </p>
          </div>

          {selectedFurniture ? (
            <div className="p-5">
              {/* Selected Item */}
              <div className="mb-6 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                  {React.createElement(
                    selectedFurniture.icon,
                    { size: 23 }
                  )}
                </div>

                <div>
                  <p className="text-sm font-bold">
                    {selectedFurniture.name}
                  </p>

                  <p className="text-xs text-slate-400">
                    Selected furniture
                  </p>
                </div>
              </div>

              {/* Width */}
              <PropertyInput
                label="Width"
                value={selectedFurniture.width}
                onChange={(value) =>
                  updateProperty("width", value)
                }
              />

              {/* Height */}
              <PropertyInput
                label="Height"
                value={selectedFurniture.height}
                onChange={(value) =>
                  updateProperty("height", value)
                }
              />

              {/* Rotation */}
              <PropertyInput
                label="Rotation"
                value={selectedFurniture.rotation}
                onChange={(value) =>
                  updateProperty("rotation", value)
                }
              />

              {/* Actions */}
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={rotateSelected}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-medium hover:bg-slate-50"
                >
                  <RotateCw size={16} />
                  Rotate
                </button>

                <button
                  onClick={deleteSelected}
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="p-5">
              <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center">
                <Move className="mx-auto mb-3 text-slate-300" size={28} />

                <p className="text-sm font-semibold text-slate-500">
                  No furniture selected
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Select an item on the canvas to edit its properties.
                </p>
              </div>
            </div>
          )}

          {/* AI Suggestions */}
          <div className="border-t border-slate-100 p-5">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-indigo-600" />

              <h2 className="font-bold">AI Layout Suggestions</h2>
            </div>

            <div className="space-y-3">
              {/* Warning */}
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                <div className="flex gap-2">
                  <AlertTriangle
                    size={17}
                    className="mt-0.5 shrink-0 text-amber-600"
                  />

                  <div>
                    <p className="text-xs font-bold text-amber-700">
                      Movement path is blocked
                    </p>

                    <p className="mt-1 text-[11px] leading-4 text-amber-600">
                      Consider moving the sofa 2 ft away from the entrance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Success */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                <div className="flex gap-2">
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />

                  <div>
                    <p className="text-xs font-bold text-emerald-700">
                      Vastu optimized
                    </p>

                    <p className="mt-1 text-[11px] leading-4 text-emerald-600">
                      Bed placement is aligned with the recommended
                      direction.
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Action */}
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700">
                <Sparkles size={17} />
                Optimize Layout with AI
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* Property Input Component */
function PropertyInput({ label, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-xs font-semibold text-slate-600">
        {label}
      </label>

      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 pr-12 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />

        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
          px
        </span>
      </div>
    </div>
  );
}