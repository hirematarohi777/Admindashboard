import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  mockHospitals,
  mockMedicalOfficers,
  mockDrivers,
  mockAmbulances,
  mockTrafficCenters,
  mockEmergencies,
  mockTrips,
  mockAuditLogs,
  systemHealth
} from '../data/mockData';
import { useNotifications } from './NotificationContext';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { addToast } = useNotifications();
  const [hospitals, setHospitals] = useState(mockHospitals);
  const [medicalOfficers, setMedicalOfficers] = useState(mockMedicalOfficers);
  const [drivers, setDrivers] = useState(mockDrivers);
  const [ambulances, setAmbulances] = useState(mockAmbulances);
  const [trafficCenters, setTrafficCenters] = useState(mockTrafficCenters);
  const [emergencies, setEmergencies] = useState(mockEmergencies);
  const [trips, setTrips] = useState(mockTrips);
  const [auditLogs, setAuditLogs] = useState(mockAuditLogs);
  const [health] = useState(systemHealth);
  const [systemConfig, setSystemConfig] = useState({
    buzzerControllers: true,
    alertThreshold: "High Priority Only",
    soundAlerts: true,
    backupInterval: "Daily",
    allowedIpList: "192.168.1.*, 10.0.0.*",
    deviceTimeoutSeconds: 15,
  });

  // Action log helper
  const addAuditLog = (action, module, recordId, reason = "", status = "Success") => {
    const newLog = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      user: "System Admin",
      action,
      module,
      recordId,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ipAddress: "192.168.1.14",
      reason,
      status
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Hospital Actions
  const updateHospitalVerification = (id, newStatus) => {
    setHospitals(prev => prev.map(h => {
      if (h.id === id) {
        addAuditLog("Modify Verification Status", "Hospitals", id, `Changed verification to ${newStatus}`);
        addToast("Hospital Status Updated", `${h.name} is now ${newStatus}.`, newStatus === 'Approved' ? 'success' : newStatus === 'Suspended' ? 'warning' : 'danger');
        return { ...h, verificationStatus: newStatus, status: newStatus === 'Approved' ? 'Active' : 'Inactive' };
      }
      return h;
    }));
  };

  const addHospital = (hospital) => {
    const newId = `HOSP-00${hospitals.length + 1}`;
    const newHosp = {
      id: newId,
      ...hospital,
      status: hospital.verificationStatus === 'Approved' ? 'Active' : 'Inactive',
      registrationDate: new Date().toISOString().split('T')[0],
    };
    setHospitals(prev => [...prev, newHosp]);
    addAuditLog("Register Hospital", "Hospitals", newId, `Registered new hospital: ${hospital.name}`);
    addToast("New Hospital Registered", `${hospital.name} has been added.`, 'success');
  };

  // Driver Actions
  const updateDriverStatus = (id, newStatus) => {
    setDrivers(prev => prev.map(d => {
      if (d.id === id) {
        addAuditLog("Verify Driver License", "Drivers", id, `Approved driver license verification: ${newStatus}`);
        addToast("Driver Status Updated", `Driver license for ${d.name} is now ${newStatus}.`, newStatus === 'Active' ? 'success' : 'danger');
        return { ...d, status: newStatus };
      }
      return d;
    }));
  };

  const assignAmbulanceToDriver = (driverId, ambulanceId) => {
    setDrivers(prev => prev.map(d => {
      if (d.id === driverId) {
        addAuditLog("Assign Ambulance", "Drivers", driverId, `Assigned driver to ${ambulanceId}`);
        return { ...d, assignedAmbulance: ambulanceId };
      }
      // If ambulance was assigned to another driver, release it
      if (ambulanceId !== 'None' && d.assignedAmbulance === ambulanceId) {
        return { ...d, assignedAmbulance: 'None' };
      }
      return d;
    }));

    setAmbulances(prev => prev.map(a => {
      if (a.id === ambulanceId) {
        const driverName = drivers.find(d => d.id === driverId)?.name || "None";
        return { ...a, driver: driverName };
      }
      return a;
    }));
    
    addToast("Ambulance Assigned", `Driver and vehicle link updated.`, 'success');
  };

  const addDriver = (driver) => {
    const newId = `DRV-00${drivers.length + 1}`;
    const newDrv = {
      id: newId,
      ...driver,
      assignedAmbulance: "None"
    };
    setDrivers(prev => [...prev, newDrv]);
    addAuditLog("Register Driver", "Drivers", newId, `Driver ${driver.name} details submitted.`);
    addToast("Driver Registered", `Driver ${driver.name} added with license ${driver.licenseNumber}.`, 'success');
  };

  // Medical Officer Actions
  const assignHospitalToMO = (moId, hospitalName) => {
    setMedicalOfficers(prev => prev.map(mo => {
      if (mo.id === moId) {
        addAuditLog("Assign Hospital", "Medical Officers", moId, `Assigned officer to ${hospitalName}`);
        addToast("Hospital Assignment Updated", `Assigned ${mo.name} to ${hospitalName}.`, 'success');
        return { ...mo, hospital: hospitalName };
      }
      return mo;
    }));
  };

  const updateMedicalOfficer = (moId, updatedFields) => {
    setMedicalOfficers(prev => prev.map(mo => {
      if (mo.id === moId) {
        addAuditLog("Modify Officer Profile", "Medical Officers", moId, "Updated doctor details");
        return { ...mo, ...updatedFields };
      }
      return mo;
    }));
    addToast("Medical Officer Updated", "Officer profile saved successfully.", 'success');
  };

  const addMedicalOfficer = (mo) => {
    const newId = `MO-00${medicalOfficers.length + 1}`;
    const newMo = {
      id: newId,
      ...mo,
      status: "Active"
    };
    setMedicalOfficers(prev => [...prev, newMo]);
    addAuditLog("Add Medical Officer", "Medical Officers", newId, `Registered Dr. ${mo.name}`);
    addToast("Medical Officer Registered", `Dr. ${mo.name} successfully registered.`, 'success');
  };

  // Ambulance Fleet Actions
  const addAmbulance = (amb) => {
    const newId = `AMB-10${ambulances.length + 1}`;
    const newAmb = {
      id: newId,
      ...amb,
      gpsStatus: "Online",
      loraStatus: "Online",
      currentStatus: "Available",
      deviceHealth: {
        gps: "Healthy",
        lora: "Healthy",
        esp32: "Healthy",
        camera: "Healthy",
        buzzer: "Idle",
        siren: "Idle",
        power: "AC Power",
        battery: 100,
        signalStrength: -60
      }
    };
    setAmbulances(prev => [...prev, newAmb]);
    addAuditLog("Add Ambulance", "Ambulances", newId, `Registered Ambulance vehicle: ${amb.vehicleNumber}`);
    addToast("Ambulance Fleet Expanded", `Vehicle ${amb.vehicleNumber} is now online.`, 'success');
  };

  // Traffic Management Center Actions
  const assignOperatorRole = (centerId, operatorName) => {
    setTrafficCenters(prev => prev.map(tc => {
      if (tc.id === centerId) {
        const alreadyExists = tc.operators.includes(operatorName);
        const newOperators = alreadyExists 
          ? tc.operators.filter(o => o !== operatorName)
          : [...tc.operators, operatorName];
        addAuditLog("Modify Operators", "Traffic Centers", centerId, `${alreadyExists ? "Removed" : "Assigned"} operator ${operatorName}`);
        addToast("Operator Updated", `Operators updated for ${tc.name}.`, 'success');
        return { ...tc, operators: newOperators };
      }
      return tc;
    }));
  };

  const assignTMCSupervisor = (centerId, supervisor) => {
    setTrafficCenters(prev => prev.map(tc => {
      if (tc.id === centerId) {
        addAuditLog("Assign Supervisor", "Traffic Centers", centerId, `Set supervisor to ${supervisor}`);
        addToast("Supervisor Assigned", `Supervisor for ${tc.name} is now ${supervisor}.`, 'success');
        return { ...tc, supervisor };
      }
      return tc;
    }));
  };

  const addTrafficCenter = (tc) => {
    const newId = `TMC-00${trafficCenters.length + 1}`;
    const newTc = {
      id: newId,
      ...tc,
      operators: [],
      status: "Active"
    };
    setTrafficCenters(prev => [...prev, newTc]);
    addAuditLog("Add Traffic Center", "Traffic Centers", newId, `Initialized ${tc.name}`);
    addToast("Traffic Center Added", `${tc.name} has been added to surveillance network.`, 'success');
  };

  // Emergency Management
  const triggerEmergency = (emergency) => {
    const newId = `EMERG-${Math.floor(800 + Math.random() * 200)}`;
    const newEmerg = {
      id: newId,
      ...emergency,
      status: "Dispatching",
      eta: "10 Mins",
      timeElapsed: "0 Mins",
      corridorType: emergency.emergencyLevel === 'Red' ? 'Green Corridor' : emergency.emergencyLevel === 'Yellow' ? 'Blue Corridor' : 'None',
      lat: 37.7749 + (Math.random() - 0.5) * 0.05,
      lng: -122.4194 + (Math.random() - 0.5) * 0.05
    };
    
    // Set ambulance as Active
    setAmbulances(prev => prev.map(a => {
      if (a.id === emergency.ambulance) {
        return { 
          ...a, 
          currentStatus: "Active",
          deviceHealth: {
            ...a.deviceHealth,
            siren: "Active",
            buzzer: "Active"
          }
        };
      }
      return a;
    }));

    setEmergencies(prev => [newEmerg, ...prev]);
    addAuditLog("Trigger Emergency Alert", "Emergencies", newId, `Level ${emergency.emergencyLevel} emergency triggered for ${emergency.patient}`);
    addToast(`Critical ${emergency.emergencyLevel.toUpperCase()} Alert`, `Emergency ${newId} initiated. Ambulance ${emergency.ambulance} dispatched.`, 'danger');
  };

  const updateEmergencyCorridor = (id, corridor) => {
    setEmergencies(prev => prev.map(e => {
      if (e.id === id) {
        addAuditLog("Update Signal Priority", "Emergencies", id, `Modified emergency priority to ${corridor}`);
        addToast("Corridor Priority Switched", `Emergency ${id} corridor layout set to: ${corridor}.`, 'success');
        return { ...e, corridorType: corridor };
      }
      return e;
    }));
  };

  const resolveEmergency = (id) => {
    const emergency = emergencies.find(e => e.id === id);
    if (!emergency) return;

    // Set ambulance back to available
    setAmbulances(prev => prev.map(a => {
      if (a.id === emergency.ambulance) {
        return { 
          ...a, 
          currentStatus: "Available",
          deviceHealth: {
            ...a.deviceHealth,
            siren: "Idle",
            buzzer: "Idle"
          }
        };
      }
      return a;
    }));

    // Create a finished trip record
    const newTrip = {
      id: `TRIP-${Math.floor(200 + Math.random() * 100)}`,
      driverName: emergency.driver,
      ambulanceId: emergency.ambulance,
      hospital: emergency.hospital,
      pickupLocation: "Assigned Incident Coordinates",
      destinationHospital: emergency.hospital,
      emergencyLevel: emergency.emergencyLevel,
      startTime: new Date(Date.now() - 20 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      arrivalTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      distanceTravelled: `${(2 + Math.random() * 5).toFixed(1)} km`,
      estimatedTime: `${15 + Math.floor(Math.random() * 10)} Mins`,
      timeSaved: emergency.corridorType !== 'None' ? `${Math.floor(3 + Math.random() * 8)} Mins` : "0 Mins",
      fuelUsage: `${(0.5 + Math.random() * 1.5).toFixed(1)} Liters`,
      tripStatus: "Completed",
      route: [
        { lat: emergency.lat, lng: emergency.lng },
        { lat: 37.7749, lng: -122.4194 } // Metro General
      ]
    };

    setTrips(prev => [newTrip, ...prev]);
    setEmergencies(prev => prev.filter(e => e.id !== id));
    addAuditLog("Resolve Emergency", "Emergencies", id, `Emergency resolved. Created trip record ${newTrip.id}`);
    addToast("Emergency Safely Resolved", `Patient arrived at ${emergency.hospital}. Trip logged.`, 'success');
  };

  // Telemetry loop simulation
  useEffect(() => {
    const timer = setInterval(() => {
      // 1. Slightly fluctuate battery levels for active/available ambulances
      setAmbulances(prev => prev.map(a => {
        if (a.currentStatus === 'Offline' || a.currentStatus === 'Maintenance') return a;
        
        let newBattery = a.deviceHealth.battery;
        let newPower = a.deviceHealth.power;
        
        if (newPower === 'Battery') {
          newBattery = Math.max(5, newBattery - 1);
          if (newBattery <= 10) {
            newPower = 'AC Power'; // Plugged back in
          }
        } else {
          newBattery = Math.min(100, newBattery + 1);
          if (newBattery === 100 && Math.random() > 0.8) {
            newPower = 'Battery'; // Unplugged
          }
        }

        // Randomly fluctuate signal strength
        const newSignal = Math.max(-105, Math.min(-50, a.deviceHealth.signalStrength + Math.floor(Math.random() * 5) - 2));

        return {
          ...a,
          deviceHealth: {
            ...a.deviceHealth,
            battery: newBattery,
            power: newPower,
            signalStrength: newSignal
          }
        };
      }));

      // 2. Increment active emergency elapsed times and count down ETAs
      setEmergencies(prev => prev.map(e => {
        const minsElapsed = parseInt(e.timeElapsed) + 1;
        const etaMins = Math.max(0, parseInt(e.eta) - 1);
        
        return {
          ...e,
          timeElapsed: `${minsElapsed} Mins`,
          eta: etaMins > 0 ? `${etaMins} Mins` : "Arrived"
        };
      }));

      // 3. Random alert trigger (10% chance per interval)
      if (Math.random() > 0.90) {
        const alertHospitals = hospitals.filter(h => h.status === 'Active');
        if (alertHospitals.length > 0) {
          const randomHosp = alertHospitals[Math.floor(Math.random() * alertHospitals.length)];
          const randomBatteryLevel = Math.floor(20 + Math.random() * 50);
          
          addToast("Telemetry Broadcast", `${randomHosp.name} reported ICU occupancy capacity at ${randomBatteryLevel}%`, 'info');
        }
      }

    }, 30000); // Trigger every 30 seconds

    return () => clearInterval(timer);
  }, [hospitals]);

  return (
    <DataContext.Provider value={{
      hospitals,
      medicalOfficers,
      drivers,
      ambulances,
      trafficCenters,
      emergencies,
      trips,
      auditLogs,
      health,
      systemConfig,
      setSystemConfig,
      updateHospitalVerification,
      addHospital,
      updateDriverStatus,
      assignAmbulanceToDriver,
      addDriver,
      assignHospitalToMO,
      updateMedicalOfficer,
      addMedicalOfficer,
      addAmbulance,
      assignOperatorRole,
      assignTMCSupervisor,
      addTrafficCenter,
      triggerEmergency,
      updateEmergencyCorridor,
      resolveEmergency,
      addAuditLog
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
