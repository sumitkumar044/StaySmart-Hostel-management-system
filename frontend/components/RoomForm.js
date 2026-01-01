"use client";
import { useState } from "react";
import { Home, IndianRupee, Users, Upload, Save, Loader2 } from "lucide-react";

export default function RoomForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    roomNumber: initialData.roomNumber || "",
    rent: initialData.rent || "",
    capacity: initialData.capacity || "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files?.[0];
      setImage(file || null);
      if (file) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview(null);
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("roomNumber", form.roomNumber);
    data.append("rent", form.rent);
    data.append("capacity", form.capacity);
    if (image) data.append("image", image);

    try {
      await onSubmit(data);
    } catch (err) {
      alert("Error: " + (err?.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  const inputContainer = "relative flex flex-col gap-2";
  const iconStyle = "absolute left-4 top-[38px] text-blue-500";
  const inputClass =
    "w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 dark:border-white/10 " +
    "bg-gray-50 dark:bg-white/5 text-black dark:text-white font-medium " +
    "focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-gray-400 placeholder:font-normal";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-8 md:p-10 space-y-6 max-w-xl mx-auto border border-gray-100 dark:border-white/5 font-sans"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-600/20">
          <Home size={24} />
        </div>
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
          {initialData._id ? "Edit" : "New"} <span className="text-blue-600">room</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Room Number */}
        <div className={inputContainer}>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">
            Room number
          </label>
          <Home size={18} className={iconStyle} />
          <input
            name="roomNumber"
            value={form.roomNumber}
            onChange={handleChange}
            placeholder="e.g. 101"
            className={inputClass}
            required
          />
        </div>

        {/* Rent */}
        <div className={inputContainer}>
          <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">
            Monthly rent
          </label>
          <IndianRupee size={18} className={iconStyle} />
          <input
            name="rent"
            type="number"
            value={form.rent}
            onChange={handleChange}
            placeholder="e.g. 5000"
            className={inputClass}
            required
          />
        </div>
      </div>

      {/* Capacity */}
      <div className={inputContainer}>
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">
          Total capacity
        </label>
        <Users size={18} className={iconStyle} />
        <input
          name="capacity"
          type="number"
          value={form.capacity}
          onChange={handleChange}
          placeholder="e.g. 2 students"
          className={inputClass}
          required
        />
      </div>

      {/* Image Upload & Preview */}
      <div className="space-y-3">
        <label className="text-xs font-medium text-gray-500 dark:text-gray-400 ml-1">
          Room photo
        </label>
        <div className="relative group">
          {preview ? (
            <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4 border-2 border-dashed border-blue-500/30">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => {
                  setImage(null);
                  setPreview(null);
                }}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full shadow-lg"
              >
                <Upload size={14} className="rotate-180" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-2xl cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-xs text-gray-500 font-medium">
                  Click to upload photo
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl text-sm font-semibold transition-all shadow-xl shadow-blue-600/30 active:scale-95 disabled:bg-gray-400"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
        {loading ? "Saving..." : "Save room configuration"}
      </button>
    </form>
  );
}
