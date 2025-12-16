/**
 * FHIR R4 Routes
 * Healthcare interoperability endpoints
 */

import { Hono } from 'hono'
import type { Bindings, Variables, FHIRPractitioner, FHIRBundle } from '../types'

export const fhirRoutes = new Hono<{ Bindings: Bindings; Variables: Variables }>()

// German Select doctors for FHIR conversion
const DOCTORS_DATA = [
  {
    id: 'dr_post_bariatric',
    name: 'Dr. Klaus Weber',
    specialization: 'Plastic and Reconstructive Surgery',
    location: 'Germany',
    certifications: ['German Board Certified', 'Post-Bariatric Specialist'],
    languages: ['German', 'English'],
  },
  {
    id: 'dr_urology_andrology',
    name: 'Dr. Hans Müller',
    specialization: 'Urology and Andrology',
    location: 'Hmmling Hospital, Germany',
    certifications: ['German Board Certified Urologist', 'Andrology Specialist'],
    languages: ['German', 'English'],
  },
  {
    id: 'dr_bariatric_antireflux',
    name: 'Dr. Friedrich Schmidt',
    specialization: 'Bariatric Surgery, Antireflux Surgery',
    location: 'Munich, Germany',
    certifications: ['German Board Certified Surgeon', 'Bariatric Specialist'],
    languages: ['German', 'English', 'Arabic'],
  },
  {
    id: 'dr_arthroscopy_sports',
    name: 'Dr. Stefan Bauer',
    specialization: 'Orthopedic Surgery, Sports Medicine',
    location: 'Frankfurt, Germany',
    certifications: ['German Board Certified Orthopedic Surgeon', 'Sports Medicine Specialist'],
    languages: ['German', 'English'],
  },
  {
    id: 'dr_cardiology',
    name: 'Prof. Dr. Michael Richter',
    specialization: 'Cardiology',
    location: 'University Hospital Kiel, Germany',
    certifications: ['German Board Certified Cardiologist', 'Academic Professor'],
    languages: ['German', 'English'],
  },
  {
    id: 'dr_anesthesia_pain',
    name: 'Dr. Thomas Fischer',
    specialization: 'Anesthesiology, Pain Management',
    location: 'Oldenburg, Germany',
    certifications: ['German Board Certified Anesthesiologist', 'Pain Management Specialist'],
    languages: ['German', 'English'],
  },
  {
    id: 'dr_internal_gastroenterology',
    name: 'Dr. Andreas Hoffmann',
    specialization: 'Internal Medicine, Gastroenterology',
    location: 'Hamburg, Germany',
    certifications: ['German Board Certified Internist', 'Gastroenterologist'],
    languages: ['German', 'English'],
  },
  {
    id: 'dr_anesthesia_head',
    name: 'Dr. Markus Klein',
    specialization: 'Anesthesiology, Pain Management',
    location: 'Medias Hospital, Germany',
    certifications: ['German Board Certified Anesthesiologist'],
    languages: ['German', 'English'],
  },
  {
    id: 'dr_general_gastrointestinal',
    name: 'Dr. Wolfgang Schröder',
    specialization: 'General Surgery, Gastrointestinal Surgery',
    location: 'Düren, Germany',
    certifications: ['German Board Certified Surgeon', 'Gastrointestinal Specialist'],
    languages: ['German', 'English'],
  },
]

// Convert doctor to FHIR Practitioner
function toFHIRPractitioner(doctor: typeof DOCTORS_DATA[0]): FHIRPractitioner {
  const nameParts = doctor.name.split(' ')
  const family = nameParts[nameParts.length - 1]
  const given = nameParts.slice(0, -1)

  return {
    resourceType: 'Practitioner',
    id: doctor.id,
    identifier: [
      {
        use: 'official',
        system: 'http://german-select.org/practitioners',
        value: doctor.id,
      },
    ],
    active: true,
    name: [
      {
        use: 'official',
        text: doctor.name,
        family,
        given,
      },
    ],
    telecom: [
      {
        system: 'email',
        value: `${doctor.id.replace('dr_', '')}@german-select.org`,
        use: 'work',
      },
    ],
    address: [
      {
        use: 'work',
        text: doctor.location,
        city: doctor.location.split(',')[0]?.trim() || 'Germany',
        country: 'DE',
      },
    ],
    qualification: doctor.certifications.map((cert) => ({
      code: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/v2-0360',
            code: 'MD',
            display: cert,
          },
        ],
      },
      issuer: {
        display: 'German Medical Board',
      },
    })),
    communication: doctor.languages.map((lang) => ({
      language: {
        coding: [
          {
            system: 'urn:ietf:bcp:47',
            code: lang === 'German' ? 'de' : lang === 'English' ? 'en' : 'ar',
            display: lang,
          },
        ],
      },
    })),
  }
}

// FHIR Capability Statement
fhirRoutes.get('/metadata', async (c) => {
  const capabilityStatement = {
    resourceType: 'CapabilityStatement',
    id: 'german-select-fhir',
    status: 'active',
    date: new Date().toISOString(),
    publisher: 'German Select Medical Tourism',
    kind: 'instance',
    software: {
      name: 'German Select FHIR Server',
      version: '2.0.0',
    },
    implementation: {
      description: 'German Select FHIR R4 API',
      url: c.req.url.replace('/metadata', ''),
    },
    fhirVersion: '4.0.1',
    format: ['application/fhir+json', 'application/json'],
    rest: [
      {
        mode: 'server',
        resource: [
          {
            type: 'Practitioner',
            profile: 'http://hl7.org/fhir/StructureDefinition/Practitioner',
            interaction: [
              { code: 'read' },
              { code: 'search-type' },
            ],
            searchParam: [
              { name: 'name', type: 'string' },
              { name: 'specialty', type: 'token' },
              { name: 'language', type: 'token' },
            ],
          },
          {
            type: 'Organization',
            profile: 'http://hl7.org/fhir/StructureDefinition/Organization',
            interaction: [
              { code: 'read' },
            ],
          },
        ],
      },
    ],
  }

  c.header('Content-Type', 'application/fhir+json')
  return c.json(capabilityStatement)
})

// Get all practitioners
fhirRoutes.get('/Practitioner', async (c) => {
  const name = c.req.query('name')
  const specialty = c.req.query('specialty')
  const language = c.req.query('language')

  let filtered = [...DOCTORS_DATA]

  if (name) {
    filtered = filtered.filter((d) =>
      d.name.toLowerCase().includes(name.toLowerCase())
    )
  }

  if (specialty) {
    filtered = filtered.filter((d) =>
      d.specialization.toLowerCase().includes(specialty.toLowerCase())
    )
  }

  if (language) {
    filtered = filtered.filter((d) =>
      d.languages.some((l) => l.toLowerCase() === language.toLowerCase())
    )
  }

  const bundle: FHIRBundle = {
    resourceType: 'Bundle',
    type: 'searchset',
    total: filtered.length,
    entry: filtered.map((doctor) => ({
      resource: toFHIRPractitioner(doctor),
    })),
  }

  c.header('Content-Type', 'application/fhir+json')
  return c.json(bundle)
})

// Get practitioner by ID
fhirRoutes.get('/Practitioner/:id', async (c) => {
  const id = c.req.param('id')
  const doctor = DOCTORS_DATA.find((d) => d.id === id)

  if (!doctor) {
    return c.json(
      {
        resourceType: 'OperationOutcome',
        issue: [
          {
            severity: 'error',
            code: 'not-found',
            diagnostics: `Practitioner with id '${id}' not found`,
          },
        ],
      },
      404
    )
  }

  c.header('Content-Type', 'application/fhir+json')
  return c.json(toFHIRPractitioner(doctor))
})

// Organization resource
fhirRoutes.get('/Organization', async (c) => {
  const organization = {
    resourceType: 'Organization',
    id: 'german-select',
    identifier: [
      {
        use: 'official',
        system: 'http://german-select.org',
        value: 'german-select-main',
      },
    ],
    active: true,
    type: [
      {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/organization-type',
            code: 'prov',
            display: 'Healthcare Provider',
          },
        ],
      },
    ],
    name: 'German Select Medical Tourism',
    alias: ['German Select', 'GS Medical'],
    telecom: [
      {
        system: 'phone',
        value: '+49 123 456 789',
        use: 'work',
      },
      {
        system: 'email',
        value: 'contact@german-select.org',
        use: 'work',
      },
      {
        system: 'url',
        value: 'https://www.germanselect.org',
        use: 'work',
      },
    ],
    address: [
      {
        use: 'work',
        type: 'both',
        text: 'Hurghada, Egypt - Red Sea Region',
        city: 'Hurghada',
        country: 'EG',
      },
      {
        use: 'work',
        type: 'both',
        text: 'Germany - Various Locations',
        country: 'DE',
      },
    ],
  }

  const bundle: FHIRBundle = {
    resourceType: 'Bundle',
    type: 'searchset',
    total: 1,
    entry: [{ resource: organization as any }],
  }

  c.header('Content-Type', 'application/fhir+json')
  return c.json(bundle)
})

// Get organization by ID
fhirRoutes.get('/Organization/:id', async (c) => {
  const id = c.req.param('id')

  if (id !== 'german-select') {
    return c.json(
      {
        resourceType: 'OperationOutcome',
        issue: [
          {
            severity: 'error',
            code: 'not-found',
            diagnostics: `Organization with id '${id}' not found`,
          },
        ],
      },
      404
    )
  }

  const organization = {
    resourceType: 'Organization',
    id: 'german-select',
    active: true,
    name: 'German Select Medical Tourism',
    telecom: [
      { system: 'email', value: 'contact@german-select.org' },
      { system: 'url', value: 'https://www.germanselect.org' },
    ],
  }

  c.header('Content-Type', 'application/fhir+json')
  return c.json(organization)
})

// FHIR health check
fhirRoutes.get('/health', async (c) => {
  return c.json({
    success: true,
    status: 'FHIR R4 API operational',
    version: '4.0.1',
    resources: ['Practitioner', 'Organization'],
    endpoints: [
      'GET /api/fhir/metadata',
      'GET /api/fhir/Practitioner',
      'GET /api/fhir/Practitioner/:id',
      'GET /api/fhir/Organization',
      'GET /api/fhir/Organization/:id',
    ],
    timestamp: new Date().toISOString(),
  })
})
