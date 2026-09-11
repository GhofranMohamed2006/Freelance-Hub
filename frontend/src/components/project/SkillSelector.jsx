import { useState } from "react";

function SkillSelector({ skills, setSkills }) {
  const [skillInput, setSkillInput] = useState("");

  const addSkill = (e) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const skill = skillInput.trim();

    if (!skill) return;

    if (skills.includes(skill)) {
      setSkillInput("");
      return;
    }

    setSkills([...skills, skill]);
    setSkillInput("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills(
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        Skills Required{" "}
        <span className="text-red-500">*</span>
      </label>

      <div>

        {/* Skills */}
        <div className="mb-2 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-2 rounded-lg bg-blue-600/15 px-3 py-1.5 text-sm text-blue-400"
            >
              {skill}

              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="text-gray-400 hover:text-red-400"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Input */}
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={addSkill}
          placeholder="Type a skill and press Enter..."
          className="w-full rounded-xl border border-gray-200 bg-white px-5 py-5 text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Press Enter to add a skill.
      </p>
    </div>
  );
}

export default SkillSelector;