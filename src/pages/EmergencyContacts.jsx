import { useState } from "react";

function EmergencyContacts() {

  const [contacts, setContacts] =
    useState([

      {
        name: "Mom",
        phone: "9876543210",
      },

      {
        name: "Dad",
        phone: "9876543211",
      },

      {
        name: "Police",
        phone: "100",
      },

      {
        name: "Ambulance",
        phone: "108",
      },

      {
        name: "Fire Brigade",
        phone: "101",
      },

    ]);

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  // ADD CONTACT
  const addContact = () => {

    if (!name || !phone) return;

    const newContact = {

      name: name,

      phone: phone,

    };

    setContacts([
      ...contacts,
      newContact,
    ]);

    setName("");

    setPhone("");

  };

  return (

    <div className="bg-gray-200 min-h-screen flex items-center justify-center p-4">

      <div className="w-[390px] h-[844px] bg-white rounded-[35px] shadow-2xl overflow-hidden flex flex-col">

        {/* HEADER */}
        <div className="p-5 border-b">

          <h1 className="text-3xl font-bold text-red-500">

            Emergency Contacts

          </h1>

          <p className="text-gray-500 mt-1">

            Quick emergency access

          </p>

        </div>

        {/* EMERGENCY ALERT CARD */}
        <div className="p-5">

          <div className="bg-red-500 text-white rounded-3xl p-5 shadow-xl">

            <h2 className="text-2xl font-bold">

              🚨 Emergency Mode

            </h2>

            <p className="mt-2 text-red-100">

              Quickly contact trusted people and emergency services.

            </p>

          </div>

        </div>

        {/* ADD CONTACT */}
        <div className="px-5 pb-5">

          <div className="bg-white border rounded-3xl p-5">

            <h2 className="text-xl font-bold text-red-500">

              Add Emergency Contact

            </h2>

            <div className="space-y-3 mt-4">

              <input
                type="text"
                placeholder="Contact Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl px-4 py-3 outline-none"
              />

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
                className="w-full border rounded-2xl px-4 py-3 outline-none"
              />

              <button
                onClick={addContact}
                className="w-full bg-red-500 text-white py-3 rounded-2xl font-bold"
              >

                Add Contact

              </button>

            </div>

          </div>

        </div>

        {/* CONTACT LIST */}
        <div className="flex-1 overflow-y-auto px-5 pb-5 space-y-4">

          {contacts.map(
            (contact, index) => (

              <div
                key={index}
                className="bg-red-50 border border-red-200 rounded-3xl p-4 flex items-center justify-between"
              >

                <div>

                  <h2 className="font-bold text-lg text-red-600">

                    {contact.name}

                  </h2>

                  <p className="text-gray-600 mt-1">

                    {contact.phone}

                  </p>

                </div>

                <a
                  href={`tel:${contact.phone}`}
                  className="bg-red-500 text-white px-5 py-3 rounded-2xl font-bold shadow"
                >

                  📞 Call

                </a>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}

export default EmergencyContacts;