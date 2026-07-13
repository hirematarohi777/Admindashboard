export const mockHospitals = [
  {
    id: "HOSP-001",
    name: "Metro General Hospital",
    city: "Smart City Downtown",
    contact: "+1 (555) 019-2834",
    status: "Active",
    registrationDate: "2025-05-12",
    verificationStatus: "Approved",
    contactPerson: "Dr. Elizabeth Vance",
    license: "LIC-88293-MGH",
    lat: 37.7749,
    lng: -122.4194,
    address: "450 Health Sciences Dr, Sector 4",
    bedsAvailable: 24,
    icuBedsAvailable: 8
  },
  {
    id: "HOSP-002",
    name: "St. Jude Trauma Center",
    city: "North Ridge",
    contact: "+1 (555) 017-9921",
    status: "Active",
    registrationDate: "2025-08-19",
    verificationStatus: "Approved",
    contactPerson: "Dr. Alan Grant",
    license: "LIC-11092-SJC",
    lat: 37.7894,
    lng: -122.4014,
    address: "888 Recovery Way, Sector 9",
    bedsAvailable: 15,
    icuBedsAvailable: 3
  },
  {
    id: "HOSP-003",
    name: "Valley Pediatrics & Children's",
    city: "Valley View",
    contact: "+1 (555) 014-8833",
    status: "Active",
    registrationDate: "2025-11-01",
    verificationStatus: "Approved",
    contactPerson: "Sarah Connor",
    license: "LIC-44589-VPC",
    lat: 37.7649,
    lng: -122.4294,
    address: "102 Childrens Ave, Sector 2",
    bedsAvailable: 30,
    icuBedsAvailable: 12
  },
  {
    id: "HOSP-004",
    name: "Apex Cardiology Institute",
    city: "East Harbor",
    contact: "+1 (555) 012-7744",
    status: "Active",
    registrationDate: "2026-01-15",
    verificationStatus: "Pending",
    contactPerson: "Dr. Arthur Pendelton",
    license: "LIC-55612-ACI",
    lat: 37.7559,
    lng: -122.4094,
    address: "606 Cardiovascular Dr, Sector 11",
    bedsAvailable: 12,
    icuBedsAvailable: 5
  },
  {
    id: "HOSP-005",
    name: "City West Wellness Center",
    city: "Westside Hills",
    contact: "+1 (555) 011-3322",
    status: "Inactive",
    registrationDate: "2026-03-20",
    verificationStatus: "Suspended",
    contactPerson: "Marcus Wright",
    license: "LIC-99881-CWW",
    lat: 37.7809,
    lng: -122.4394,
    address: "19 Sunset Blvd, Sector 6",
    bedsAvailable: 0,
    icuBedsAvailable: 0
  }
];

export const mockMedicalOfficers = [
  {
    id: "MO-001",
    name: "Dr. Elizabeth Vance",
    hospital: "Metro General Hospital",
    specialization: "Trauma Surgery",
    status: "Active",
    email: "e.vance@metrogeneral.gov",
    phone: "+1 (555) 019-2830"
  },
  {
    id: "MO-002",
    name: "Dr. Alan Grant",
    hospital: "St. Jude Trauma Center",
    specialization: "Emergency Medicine",
    status: "Active",
    email: "a.grant@stjude.gov",
    phone: "+1 (555) 017-9922"
  },
  {
    id: "MO-003",
    name: "Dr. Sarah Connor",
    hospital: "Valley Pediatrics & Children's",
    specialization: "Pediatric Emergency",
    status: "Active",
    email: "s.connor@valleypediatrics.gov",
    phone: "+1 (555) 014-8834"
  },
  {
    id: "MO-004",
    name: "Dr. Stephen Strange",
    hospital: "Metro General Hospital",
    specialization: "Neurosurgery",
    status: "Active",
    email: "s.strange@metrogeneral.gov",
    phone: "+1 (555) 019-5567"
  },
  {
    id: "MO-005",
    name: "Dr. Leonard McCoy",
    hospital: "Apex Cardiology Institute",
    specialization: "Cardiology",
    status: "Inactive",
    email: "l.mccoy@apexcardio.gov",
    phone: "+1 (555) 012-7740"
  }
];

export const mockDrivers = [
  {
    id: "DRV-001",
    name: "John Miller",
    licenseNumber: "DL-CA992837",
    assignedAmbulance: "AMB-101",
    status: "Active",
    experience: "8 Years",
    phone: "+1 (555) 021-9988"
  },
  {
    id: "DRV-002",
    name: "Robert Chen",
    licenseNumber: "DL-CA882931",
    assignedAmbulance: "AMB-102",
    status: "Active",
    experience: "5 Years",
    phone: "+1 (555) 021-4433"
  },
  {
    id: "DRV-003",
    name: "Michael Porter",
    licenseNumber: "DL-CA772635",
    assignedAmbulance: "AMB-103",
    status: "Active",
    experience: "12 Years",
    phone: "+1 (555) 021-1122"
  },
  {
    id: "DRV-004",
    name: "David Jenkins",
    licenseNumber: "DL-CA110293",
    assignedAmbulance: "None",
    status: "Pending",
    experience: "2 Years",
    phone: "+1 (555) 021-6655"
  },
  {
    id: "DRV-005",
    name: "Carlos Santana",
    licenseNumber: "DL-CA338927",
    assignedAmbulance: "None",
    status: "Rejected",
    experience: "1 Year",
    phone: "+1 (555) 021-7788"
  }
];

export const mockAmbulances = [
  {
    id: "AMB-101",
    vehicleNumber: "TX-EM-4040",
    hospital: "Metro General Hospital",
    driver: "John Miller",
    gpsStatus: "Online",
    loraStatus: "Online",
    currentStatus: "Active",
    deviceHealth: {
      gps: "Healthy",
      lora: "Healthy",
      esp32: "Healthy",
      camera: "Healthy",
      buzzer: "Active",
      siren: "Active",
      power: "AC Power",
      battery: 98,
      signalStrength: -65
    }
  },
  {
    id: "AMB-102",
    vehicleNumber: "TX-EM-7020",
    hospital: "St. Jude Trauma Center",
    driver: "Robert Chen",
    gpsStatus: "Online",
    loraStatus: "Online",
    currentStatus: "Active",
    deviceHealth: {
      gps: "Healthy",
      lora: "Healthy",
      esp32: "Healthy",
      camera: "Offline",
      buzzer: "Idle",
      siren: "Active",
      power: "Battery",
      battery: 45,
      signalStrength: -72
    }
  },
  {
    id: "AMB-103",
    vehicleNumber: "TX-EM-1120",
    hospital: "Valley Pediatrics & Children's",
    driver: "Michael Porter",
    gpsStatus: "Online",
    loraStatus: "Offline",
    currentStatus: "Available",
    deviceHealth: {
      gps: "Healthy",
      lora: "Faulty",
      esp32: "Healthy",
      camera: "Healthy",
      buzzer: "Idle",
      siren: "Idle",
      power: "AC Power",
      battery: 100,
      signalStrength: -90
    }
  },
  {
    id: "AMB-104",
    vehicleNumber: "TX-EM-8890",
    hospital: "Apex Cardiology Institute",
    driver: "None",
    gpsStatus: "Offline",
    loraStatus: "Offline",
    currentStatus: "Maintenance",
    deviceHealth: {
      gps: "Faulty",
      lora: "Faulty",
      esp32: "Faulty",
      camera: "Offline",
      buzzer: "Offline",
      siren: "Offline",
      power: "None",
      battery: 0,
      signalStrength: -110
    }
  },
  {
    id: "AMB-105",
    vehicleNumber: "TX-EM-3030",
    hospital: "Metro General Hospital",
    driver: "None",
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
      power: "Battery",
      battery: 82,
      signalStrength: -58
    }
  }
];

export const mockTrafficCenters = [
  {
    id: "TMC-001",
    name: "Central Traffic Operations",
    city: "Smart City Downtown",
    supervisor: "Commander Marcus Brody",
    operators: ["Lucas Scott", "Elena Gilbert", "Jack Shephard"],
    status: "Active"
  },
  {
    id: "TMC-002",
    name: "North Grid Control Hub",
    city: "North Ridge",
    supervisor: "Officer Jim Gordon",
    operators: ["Harvey Dent", "Barbara Kean"],
    status: "Active"
  },
  {
    id: "TMC-003",
    name: "Valley Bypass Traffic Center",
    city: "Valley View",
    supervisor: "Supervisor Walter White",
    operators: ["Jesse Pinkman", "Skyler White"],
    status: "Active"
  },
  {
    id: "TMC-004",
    name: "East Harbor Logistics Command",
    city: "East Harbor",
    supervisor: "Director Maria Hill",
    operators: ["Phil Coulson"],
    status: "Inactive"
  }
];

export const mockEmergencies = [
  {
    id: "EMERG-881",
    ambulance: "AMB-101",
    driver: "John Miller",
    patient: "Frank Castle (Cardiac Arrest)",
    hospital: "Metro General Hospital",
    destination: "Metro General Trauma Room A",
    emergencyLevel: "Red",
    status: "Transporting",
    eta: "4 Mins",
    timeElapsed: "11 Mins",
    corridorType: "Green Corridor",
    lat: 37.7789,
    lng: -122.4114
  },
  {
    id: "EMERG-882",
    ambulance: "AMB-102",
    driver: "Robert Chen",
    patient: "Diana Prince (Multiple Fractures)",
    hospital: "St. Jude Trauma Center",
    destination: "St. Jude ER - Bay 3",
    emergencyLevel: "Yellow",
    status: "Patient Pickup",
    eta: "7 Mins",
    timeElapsed: "5 Mins",
    corridorType: "Blue Corridor",
    lat: 37.7854,
    lng: -122.4054
  },
  {
    id: "EMERG-883",
    ambulance: "AMB-103",
    driver: "Michael Porter",
    patient: "Bruce Wayne (Mild Dehydration)",
    hospital: "Valley Pediatrics & Children's",
    destination: "Valley Pediatrics Clinic",
    emergencyLevel: "Green",
    status: "Dispatching",
    eta: "12 Mins",
    timeElapsed: "2 Mins",
    corridorType: "None",
    lat: 37.7689,
    lng: -122.4244
  }
];

export const mockTrips = [
  {
    id: "TRIP-209",
    driverName: "John Miller",
    ambulanceId: "AMB-101",
    hospital: "Metro General Hospital",
    pickupLocation: "101 Market St, Financial District",
    destinationHospital: "Metro General Hospital",
    emergencyLevel: "Red",
    startTime: "10:05 AM",
    arrivalTime: "10:18 AM",
    distanceTravelled: "4.8 km",
    estimatedTime: "22 Mins",
    timeSaved: "9 Mins",
    fuelUsage: "1.2 Liters",
    tripStatus: "Completed",
    route: [
      { lat: 37.7944, lng: -122.3948 },
      { lat: 37.7894, lng: -122.4014 },
      { lat: 37.7824, lng: -122.4084 },
      { lat: 37.7749, lng: -122.4194 }
    ]
  },
  {
    id: "TRIP-210",
    driverName: "Robert Chen",
    ambulanceId: "AMB-102",
    hospital: "St. Jude Trauma Center",
    pickupLocation: "Lombard St & Hyde St",
    destinationHospital: "St. Jude Trauma Center",
    emergencyLevel: "Yellow",
    startTime: "09:12 AM",
    arrivalTime: "09:27 AM",
    distanceTravelled: "6.2 km",
    estimatedTime: "18 Mins",
    timeSaved: "3 Mins",
    fuelUsage: "1.5 Liters",
    tripStatus: "Completed",
    route: [
      { lat: 37.8021, lng: -122.4196 },
      { lat: 37.7954, lng: -122.4124 },
      { lat: 37.7894, lng: -122.4014 }
    ]
  },
  {
    id: "TRIP-211",
    driverName: "Michael Porter",
    ambulanceId: "AMB-103",
    hospital: "Valley Pediatrics & Children's",
    pickupLocation: "Mission Dolores Park",
    destinationHospital: "Valley Pediatrics & Children's",
    emergencyLevel: "Green",
    startTime: "08:30 AM",
    arrivalTime: "08:45 AM",
    distanceTravelled: "3.1 km",
    estimatedTime: "15 Mins",
    timeSaved: "0 Mins",
    fuelUsage: "0.8 Liters",
    tripStatus: "Completed",
    route: [
      { lat: 37.7596, lng: -122.4269 },
      { lat: 37.7649, lng: -122.4294 }
    ]
  },
  {
    id: "TRIP-212",
    driverName: "John Miller",
    ambulanceId: "AMB-101",
    hospital: "Metro General Hospital",
    pickupLocation: "Pier 39, Fisherman's Wharf",
    destinationHospital: "Metro General Hospital",
    emergencyLevel: "Red",
    startTime: "07:10 AM",
    arrivalTime: "07:22 AM",
    distanceTravelled: "5.5 km",
    estimatedTime: "19 Mins",
    timeSaved: "7 Mins",
    fuelUsage: "1.4 Liters",
    tripStatus: "Completed",
    route: [
      { lat: 37.8080, lng: -122.4177 },
      { lat: 37.7950, lng: -122.4100 },
      { lat: 37.7749, lng: -122.4194 }
    ]
  }
];

export const mockNotifications = [
  {
    id: "NOTIF-001",
    type: "New Hospital Registration",
    title: "Apex Cardiology Institute Registered",
    message: "Apex Cardiology Institute submitted license documents for System Admin verification.",
    timestamp: "10 Mins Ago",
    priority: "info",
    unread: true
  },
  {
    id: "NOTIF-002",
    type: "Critical Emergency",
    title: "Level RED Emergency Dispatched",
    message: "Ambulance AMB-101 dispatched to Financial District for Cardiac Arrest incident.",
    timestamp: "15 Mins Ago",
    priority: "danger",
    unread: true
  },
  {
    id: "NOTIF-003",
    type: "Green Corridor Activated",
    title: "Green Corridor Active on Market St",
    message: "Traffic Management Center synchronized signals on Sector 4 for AMB-101.",
    timestamp: "12 Mins Ago",
    priority: "success",
    unread: true
  },
  {
    id: "NOTIF-004",
    type: "LoRa Failure",
    title: "LoRa Connectivity Drop - AMB-103",
    message: "LoRa hardware telemetry connection lost for Ambulance AMB-103. GPS remains active.",
    timestamp: "1 Hour Ago",
    priority: "warning",
    unread: false
  },
  {
    id: "NOTIF-005",
    type: "New Driver Registration",
    title: "Driver License Submitted - David Jenkins",
    message: "David Jenkins (DL-CA110293) requested verification status approval.",
    timestamp: "3 Hours Ago",
    priority: "info",
    unread: false
  }
];

export const mockAuditLogs = [
  {
    id: "AUD-1002",
    user: "System Admin",
    action: "Approve Registration",
    module: "Hospitals",
    recordId: "HOSP-003",
    date: "2026-07-13",
    time: "10:15 AM",
    ipAddress: "192.168.1.14",
    reason: "Verification of License LIC-44589-VPC completed.",
    status: "Success"
  },
  {
    id: "AUD-1001",
    user: "System Admin",
    action: "Assign Ambulance",
    module: "Drivers",
    recordId: "DRV-001",
    date: "2026-07-13",
    time: "09:40 AM",
    ipAddress: "192.168.1.14",
    reason: "Assigned John Miller to vehicle AMB-101.",
    status: "Success"
  },
  {
    id: "AUD-1000",
    user: "TMC Operator",
    action: "Activate Green Corridor",
    module: "Traffic Control",
    recordId: "TMC-001",
    date: "2026-07-13",
    time: "08:12 AM",
    ipAddress: "192.168.2.88",
    reason: "Emergency priority clearance for TRIP-209.",
    status: "Success"
  },
  {
    id: "AUD-0999",
    user: "System Admin",
    action: "Update Configuration",
    module: "Settings",
    recordId: "SYS-CONF",
    date: "2026-07-12",
    time: "04:30 PM",
    ipAddress: "192.168.1.14",
    reason: "Modified alert thresholds for LoRa link dropouts (from 5s to 15s).",
    status: "Success"
  }
];

export const systemHealth = {
  overallHealth: "Excellent",
  gpsConnectivity: 98.4,
  loraConnectivity: 87.5,
  trafficSignalHealth: 99.1,
  deviceIssuesCount: 2
};
