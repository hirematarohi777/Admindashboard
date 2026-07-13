import {
  Hospital,
  Stethoscope,
  Truck,
  TrafficCone,
  ShieldCheck,
  Radio,
  MapPin,
  Lock,
  Clock,
  Building2,
} from 'lucide-react';

// ─── Role Definitions ────────────────────────────────────────────────────────
export const ROLES = [
  {
    id: 'hospital',
    label: 'Hospital',
    icon: Hospital,
    description:
      'Register your healthcare facility to receive real-time emergency dispatch coordination and patient routing.',
    approvalTime: 'Usually reviewed within 24–48 hrs',
    color: 'primary',
    gradient: 'from-blue-600/20 to-blue-500/5',
    border: 'border-blue-500/40',
    iconBg: 'bg-blue-500/10 text-blue-500 dark:text-blue-400',
  },
  {
    id: 'medical_officer',
    label: 'Medical Officer',
    icon: Stethoscope,
    description:
      'Register as a licensed medical officer to supervise ambulance crews, triage patients, and log case reports.',
    approvalTime: 'Usually reviewed within 24 hrs',
    color: 'secondary',
    gradient: 'from-green-600/20 to-green-500/5',
    border: 'border-green-500/40',
    iconBg: 'bg-green-500/10 text-green-600 dark:text-green-400',
  },
  {
    id: 'driver',
    label: 'Ambulance Driver',
    icon: Truck,
    description:
      'Register as a certified ambulance driver to receive dispatch alerts, GPS routing, and trip assignment.',
    approvalTime: 'Usually reviewed within 12–24 hrs',
    color: 'warning',
    gradient: 'from-amber-600/20 to-amber-500/5',
    border: 'border-amber-500/40',
    iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  {
    id: 'traffic_center',
    label: 'Traffic Management Center',
    icon: TrafficCone,
    description:
      'Register your traffic control center to receive green-corridor clearance requests and intersection override commands.',
    approvalTime: 'Usually reviewed within 48 hrs',
    color: 'danger',
    gradient: 'from-red-600/20 to-red-500/5',
    border: 'border-red-500/40',
    iconBg: 'bg-red-500/10 text-red-600 dark:text-red-400',
  },
];

// ─── Role Field Configurations ────────────────────────────────────────────────
export const ROLE_FIELDS = {
  hospital: {
    basicInfo: [
      { name: 'hospitalName', label: 'Hospital Name', type: 'text', required: true, colSpan: 2 },
      { name: 'registrationNumber', label: 'Registration / License Number', type: 'text', required: true },
      { name: 'city', label: 'City', type: 'text', required: true },
      { name: 'address', label: 'Full Address', type: 'text', required: true, colSpan: 2 },
      { name: 'contactPerson', label: 'Contact Person Name', type: 'text', required: true },
      { name: 'phone', label: 'Contact Phone', type: 'tel', required: true },
      { name: 'email', label: 'Official Email', type: 'email', required: true },
      { name: 'numberOfBeds', label: 'Total Number of Beds', type: 'number', required: true },
      {
        name: 'hasEmergencyDept',
        label: 'Emergency Department',
        type: 'radio',
        required: true,
        options: [
          { label: 'Yes, we have an ED', value: 'yes' },
          { label: 'No ED', value: 'no' },
        ],
        colSpan: 2,
      },
      { name: 'password', label: 'Create Password', type: 'password', required: true },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
    ],
    documents: [
      {
        name: 'licenseDoc',
        label: 'Hospital License / Registration Certificate',
        hint: 'PDF or image, max 10 MB',
        required: true,
        accept: 'image/*,application/pdf',
      },
      {
        name: 'accreditationDoc',
        label: 'Accreditation Certificate',
        hint: 'PDF or image, max 10 MB',
        required: false,
        accept: 'image/*,application/pdf',
      },
    ],
  },

  medical_officer: {
    basicInfo: [
      { name: 'fullName', label: 'Full Name', type: 'text', required: true, colSpan: 2 },
      {
        name: 'specialization',
        label: 'Specialization',
        type: 'select',
        required: true,
        options: [
          { label: 'Emergency Medicine', value: 'emergency_medicine' },
          { label: 'Cardiology', value: 'cardiology' },
          { label: 'Trauma Surgery', value: 'trauma_surgery' },
          { label: 'Neurology', value: 'neurology' },
          { label: 'Pediatrics', value: 'pediatrics' },
          { label: 'General Medicine', value: 'general_medicine' },
          { label: 'Critical Care', value: 'critical_care' },
          { label: 'Other', value: 'other' },
        ],
      },
      { name: 'medicalLicenseNumber', label: 'Medical License Number', type: 'text', required: true },
      {
        name: 'affiliatedHospital',
        label: 'Affiliated Hospital',
        type: 'select',
        required: true,
        options: [
          { label: 'City General Hospital', value: 'cgh' },
          { label: 'Metro Emergency Centre', value: 'mec' },
          { label: 'Sunrise Medical Institute', value: 'smi' },
          { label: 'Apollo City Hospital', value: 'ach' },
          { label: 'District Trauma Centre', value: 'dtc' },
          { label: 'Other / Not Listed', value: 'other' },
        ],
      },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'email', label: 'Email Address', type: 'email', required: true },
      { name: 'yearsExperience', label: 'Years of Experience', type: 'number', required: true },
      { name: 'password', label: 'Create Password', type: 'password', required: true },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
    ],
    documents: [
      {
        name: 'medicalLicense',
        label: 'Medical License Certificate',
        hint: 'PDF or image, max 10 MB',
        required: true,
        accept: 'image/*,application/pdf',
      },
    ],
  },

  driver: {
    basicInfo: [
      { name: 'fullName', label: 'Full Name', type: 'text', required: true, colSpan: 2 },
      { name: 'driverLicenseNumber', label: "Driver's License Number", type: 'text', required: true },
      { name: 'licenseExpiry', label: 'License Expiry Date', type: 'date', required: true },
      { name: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { name: 'email', label: 'Email Address', type: 'email', required: true },
      { name: 'yearsDrivingExp', label: 'Years of Driving Experience', type: 'number', required: true },
      {
        name: 'vehicleNumber',
        label: 'Ambulance Vehicle Number (optional)',
        type: 'text',
        required: false,
        colSpan: 2,
      },
      { name: 'password', label: 'Create Password', type: 'password', required: true },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
    ],
    documents: [
      {
        name: 'driverLicense',
        label: "Driver's License",
        hint: 'PDF or image, max 10 MB',
        required: true,
        accept: 'image/*,application/pdf',
      },
      {
        name: 'idProof',
        label: 'Government-Issued ID Proof',
        hint: 'Aadhaar / Passport / Voter ID — PDF or image, max 10 MB',
        required: true,
        accept: 'image/*,application/pdf',
      },
    ],
  },

  traffic_center: {
    basicInfo: [
      { name: 'centerName', label: 'Traffic Management Center Name', type: 'text', required: true, colSpan: 2 },
      { name: 'cityZone', label: 'City / Zone', type: 'text', required: true },
      { name: 'supervisorName', label: 'Supervisor Name', type: 'text', required: true },
      { name: 'contactNumber', label: 'Contact Number', type: 'tel', required: true },
      { name: 'email', label: 'Official Email', type: 'email', required: true },
      {
        name: 'intersectionsManaged',
        label: 'Number of Intersections Managed',
        type: 'number',
        required: true,
      },
      { name: 'password', label: 'Create Password', type: 'password', required: true },
      { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
    ],
    documents: [
      {
        name: 'authorizationLetter',
        label: 'Authorization Letter from Municipal Authority',
        hint: 'PDF or image, max 10 MB',
        required: true,
        accept: 'image/*,application/pdf',
      },
    ],
  },
};

// ─── Trust Badges ─────────────────────────────────────────────────────────────
export const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'Government Verified Platform', color: 'blue' },
  { icon: Radio, label: '24/7 Emergency Dispatch', color: 'green' },
  { icon: MapPin, label: 'GPS + LoRa Fleet Tracking', color: 'amber' },
  { icon: Lock, label: 'ISO-Aligned Data Security', color: 'blue' },
  { icon: Building2, label: '500+ Verified Hospitals', color: 'green' },
  { icon: Clock, label: 'Avg. Approval: 24 Hrs', color: 'amber' },
];

// ─── Steps ────────────────────────────────────────────────────────────────────
export const STEPS = [
  { id: 0, label: 'Select Role' },
  { id: 1, label: 'Basic Info' },
  { id: 2, label: 'Documents' },
  { id: 3, label: 'Review' },
];
