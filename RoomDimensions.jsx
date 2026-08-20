import React, { useState } from "react";
import {
  BedDouble,
  ChefHat,
  Home,
  Ruler,
  ArrowRight,
} from "lucide-react";

const roomTypes = [
  { value: "Bedroom", icon: BedDouble },
  { value: "Living Room", icon: Home },
  { value: "Kitchen", icon: ChefHat },
];

export default function RoomDimensions({ onStartDesigning }) {
  const [roomType, setRoomType] = useState("Bedroom");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!length || !width) {
      alert("Please enter room length and width.");
      return;
    }

    onStartDesigning?.({
      roomType,
      length: Number(length),
      width: Number(width),
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <Ruler size={28} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Design Your Room
          </h1>

          <p className="mt-2 text-slate-500">
            Enter your room dimensions to start creating your perfect layout.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50"
        >
          {/* Room Type */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Room Type
            </label>

            <div className="grid grid-cols-3 gap-3">
              {roomTypes.map(({ value, icon: Icon }) => {
                const active = roomType === value;

                return (
                  <button
                    type="button"
                    key={value}
                    onClick={() => setRoomType(value)}
                    className={`flex flex-col items-center justify-center gap-2 rounded-2xl border p-4 transition-all ${
                      active
                        ? "border-indigo-500 bg-indigo-50 text-indigo-600 shadow-sm"
                        : "border-slate-200 bg-white text-slate-500 hover:border-indigo-300 hover:bg-slate-50"
                    }`}
                  >
                    <Icon size={25} />

                    <span className="text-xs font-medium text-center">
                      {value}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dimensions */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Length
              </label>

              <div className="relative">
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="e.g. 15"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-14 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                  ft
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Width
              </label>

              <div className="relative">
                <input
                  type="number"
                  min="1"
                  step="0.1"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  placeholder="e.g. 12"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pr-14 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">
                  ft
                </span>
              </div>
            </div>
          </div>

          {/* Room Preview */}
          {length && width && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Room Preview
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {roomType} · {length} × {width} ft
                  </p>
                </div>

                <div className="rounded-xl bg-white px-3 py-2 text-sm font-bold text-indigo-600 shadow-sm">
                  {Number(length) * Number(width)} sq ft
                </div>
              </div>
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-xl active:scale-[0.99]"
          >
            Start Designing
            <ArrowRight size={19} />
          </button>
        </form>
      </div>
    </div>
  );
}