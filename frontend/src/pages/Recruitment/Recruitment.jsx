import { useEffect, useState } from 'react'
import './Recruitment.css'

const API_URL = 'http://localhost:8080/api/job-vacancies'
const APPLICANT_API_URL = 'http://localhost:8080/api/applicants'
const APPLICATION_API_URL = 'http://localhost:8080/api/applications'
const RECRUITMENT_STAGE_API_URL = 'http://localhost:8080/api/recruitment-stages'
const INTERVIEW_API_URL = 'http://localhost:8080/api/interviews'
const OFFER_API_URL = 'http://localhost:8080/api/offers'
const ONBOARDING_API_URL = 'http://localhost:8080/api/onboarding'
const ONBOARDING_TASK_API_URL = 'http://localhost:8080/api/onboarding-tasks'
const DOCUMENT_API_URL = 'http://localhost:8080/api/documents'

function Recruitment() {

  // =========================
  // STATES
  // =========================

  const [vacancies, setVacancies] = useState([])
  const [applicants, setApplicants] = useState([])
  const [applications, setApplications] = useState([])
  const [recruitmentStages, setRecruitmentStages] = useState([])
  const [interviews, setInterviews] = useState([])
  const [offers, setOffers] = useState([])
  const [onboardings, setOnboardings] = useState([])
  const [documents, setDocuments] = useState([])

  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [showStageModal, setShowStageModal] = useState(false)
  const [showInterviewModal, setShowInterviewModal] = useState(false)
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [showOnboardingModal, setShowOnboardingModal] = useState(false)
  const [showDocumentModal, setShowDocumentModal] = useState(false)

  const [editingApplicationId, setEditingApplicationId] = useState(null)
  const [editingStageId, setEditingStageId] = useState(null)
  const [editingInterviewId, setEditingInterviewId] = useState(null)
  const [editingOfferId, setEditingOfferId] = useState(null)
  const [editingOnboardingId, setEditingOnboardingId] = useState(null)
  const [editingDocumentId, setEditingDocumentId] = useState(null)

  const [applicationSearchTerm, setApplicationSearchTerm] = useState('')

  const [applicationStatusFilter, setApplicationStatusFilter] = useState('All')
  const [stageSearchTerm, setStageSearchTerm] = useState('')
  const [stageStatusFilter, setStageStatusFilter] = useState('All')
  const [interviewSearchTerm, setInterviewSearchTerm] = useState('')
  const [interviewStatusFilter, setInterviewStatusFilter] = useState('All')
  const [offerSearchTerm, setOfferSearchTerm] = useState('')
  const [offerStatusFilter, setOfferStatusFilter] = useState('All')
  const [onboardingSearchTerm, setOnboardingSearchTerm] = useState('')
  const [onboardingStatusFilter, setOnboardingStatusFilter] = useState('All')
  const [documentSearchTerm, setDocumentSearchTerm] = useState('')
  const [documentStatusFilter, setDocumentStatusFilter] = useState('All')
  const [documentTypeFilter, setDocumentTypeFilter] = useState('All')
  const [onboardingTasks, setOnboardingTasks] = useState([])
  const [showOnboardingTaskModal, setShowOnboardingTaskModal] = useState(false)
  const [editingOnboardingTaskId, setEditingOnboardingTaskId] = useState(null)

  const [onboardingTaskSearchTerm, setOnboardingTaskSearchTerm] = useState('')
  const [onboardingTaskStatusFilter, setOnboardingTaskStatusFilter] = useState('All')

  const [documentFormData, setDocumentFormData] = useState({
    onboardingId: '',
    documentName: '',
    documentType: 'Identity',
    submittedDate: '',
    status: 'Pending',
    notes: ''
  })

  const [onboardingTaskFormData, setOnboardingTaskFormData] = useState({
    onboardingId: '',
    taskName: '',
    description: '',
    dueDate: '',
    status: 'Pending'
  })

  const [applicationFormData, setApplicationFormData] = useState({
    applicantId: '',
    jobVacancyId: '',
    applicationDate: '',
    status: 'Applied',
    notes: ''
  })

  const [stageFormData, setStageFormData] = useState({
    applicationId: '',
    stageName: 'Screening',
    stageDate: '',
    notes: '',
    status: 'Pending'
  })

  const [interviewFormData, setInterviewFormData] = useState({
    applicationId: '',
    interviewDate: '',
    interviewTime: '',
    interviewType: 'Online',
    interviewer: '',
    notes: '',
    status: 'Scheduled'
  })

  const [offerFormData, setOfferFormData] = useState({
    applicationId: '',
    offerDate: '',
    joiningDate: '',
    salary: '',
    jobTitle: '',
    terms: '',
    status: 'Pending'
  })

  const [onboardingFormData, setOnboardingFormData] = useState({
    applicationId: '',
    startDate: '',
    completionDate: '',
    status: 'Pending',
    notes: ''
  })

  const [showModal, setShowModal] = useState(false)
  const [showApplicantModal, setShowApplicantModal] = useState(false)

  const [editingVacancyId, setEditingVacancyId] = useState(null)
  const [editingApplicantId, setEditingApplicantId] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')

  const [statusFilter, setStatusFilter] = useState('All')
  const [applicantSearchTerm, setApplicantSearchTerm] = useState('')
  const [applicantStatusFilter, setApplicantStatusFilter] = useState('All')

  const [loading, setLoading] = useState(false)

  const [applicantFormData, setApplicantFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    resumePath: '',
    status: 'Active',
  })

  const [formData, setFormData] = useState({
    jobTitle: '',
    department: '',
    position: '',
    description: '',
    requirements: '',
    openingDate: '',
    closingDate: '',
    status: 'Open',
  })


  // =========================
  // LOAD VACANCIES
  // =========================

  useEffect(() => {
    loadVacancies()
    loadApplicants()
    loadApplications()
    loadRecruitmentStages()
    loadInterviews()
    loadOffers()
    loadOnboardings()
    loadOnboardingTasks()
    loadDocuments()
  }, [])


  const loadVacancies = async () => {

    try {

      setLoading(true)

      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Failed to load vacancies')
      }

      const data = await response.json()

      setVacancies(data)

    } catch (error) {

      console.error('Vacancy loading error:', error)

      alert('Failed to load job vacancies.')

    } finally {

      setLoading(false)

    }
  }


  // =========================
  // LOAD APPLICANTS
  // =========================

  const loadApplicants = async () => {
    try {
      const response = await fetch(APPLICANT_API_URL)

      if (!response.ok) {
        throw new Error('Failed to load applicants')
      }

      const data = await response.json()
      setApplicants(data)
    } catch (error) {
      console.error('Applicant loading error:', error)
      alert('Failed to load applicants.')
    }
  }
  // =========================
  // LOAD APPLICATIONS
  // =========================

  const loadApplications = async () => {
    try {
      const response = await fetch(APPLICATION_API_URL)

      if (!response.ok) {
        throw new Error('Failed to load applications')
      }

      const data = await response.json()

      setApplications(data)
    } catch (error) {
      console.error('Application loading error:', error)
      alert('Failed to load applications.')
    }
  }
  // =========================
  // LOAD RECRUITMENT STAGES
  // =========================

  const loadRecruitmentStages = async () => {
    try {
      const response = await fetch(RECRUITMENT_STAGE_API_URL)

      if (!response.ok) {
        throw new Error('Failed to load recruitment stages')
      }

      const data = await response.json()
      setRecruitmentStages(data)
    } catch (error) {
      console.error('Recruitment stage loading error:', error)
      alert('Failed to load recruitment stages.')
    }
  }

  // =========================
  // LOAD INTERVIEWS
  // =========================

  const loadInterviews = async () => {
    try {
      const response = await fetch(INTERVIEW_API_URL)

      if (!response.ok) {
        throw new Error('Failed to load interviews')
      }

      const data = await response.json()
      setInterviews(data)
    } catch (error) {
      console.error('Interview loading error:', error)
      alert('Failed to load interviews.')
    }
  }

  // =========================
  // LOAD OFFERS
  // =========================

  const loadOffers = async () => {
    try {
      const response = await fetch(OFFER_API_URL)

      if (!response.ok) {
        throw new Error('Failed to load offers')
      }

      const data = await response.json()
      setOffers(data)
    } catch (error) {
      console.error('Offer loading error:', error)
      alert('Failed to load offers.')
    }
  }

  // =========================
  // LOAD ONBOARDINGS
  // =========================

  const loadOnboardings = async () => {
    try {
      const response = await fetch(ONBOARDING_API_URL)

      if (!response.ok) {
        throw new Error('Failed to load onboarding records')
      }

      const data = await response.json()
      setOnboardings(data)
    } catch (error) {
      console.error('Onboarding loading error:', error)
      alert('Failed to load onboarding records.')
    }
  }


  // =========================
  // LOAD ONBOARDING TASKS
  // =========================

  const loadOnboardingTasks = async () => {
    try {
      const response = await fetch(ONBOARDING_TASK_API_URL)

      if (!response.ok) {
        throw new Error('Failed to load onboarding tasks')
      }

      const data = await response.json()
      setOnboardingTasks(data)
    } catch (error) {
      console.error('Onboarding task loading error:', error)
      alert('Failed to load onboarding tasks.')
    }
  }

  // =========================
  // LOAD DOCUMENTS
  // =========================

  const loadDocuments = async () => {
    try {
      const response = await fetch(DOCUMENT_API_URL)

      if (!response.ok) {
        throw new Error('Failed to load documents')
      }

      const data = await response.json()
      setDocuments(data)
    } catch (error) {
      console.error('Document loading error:', error)
      alert('Failed to load documents.')
    }
  }

  // =========================
  // APPLICATION FORM HANDLER
  // =========================

  const handleApplicationChange = (e) => {
    const { name, value } = e.target

    setApplicationFormData((previousData) => ({
      ...previousData,
      [name]: value
    }))
  }


  // =========================
  // RESET APPLICATION FORM
  // =========================

  const resetApplicationForm = () => {
    setApplicationFormData({
      applicantId: '',
      jobVacancyId: '',
      applicationDate: '',
      status: 'Applied',
      notes: ''
    })

    setEditingApplicationId(null)
  }


  // =========================
  // OPEN APPLICATION MODAL
  // =========================

  const openApplicationModal = () => {
    resetApplicationForm()
    setShowApplicationModal(true)
  }


  // =========================
  // CLOSE APPLICATION MODAL
  // =========================

  const closeApplicationModal = () => {
    setShowApplicationModal(false)
    resetApplicationForm()
  }

  // =========================
  // CREATE / UPDATE APPLICATION
  // =========================

  const handleApplicationSubmit = async (e) => {
    e.preventDefault()

    if (!applicationFormData.applicantId) {
      alert('Please select an applicant.')
      return
    }

    if (!applicationFormData.jobVacancyId) {
      alert('Please select a job vacancy.')
      return
    }

    if (!applicationFormData.applicationDate) {
      alert('Please select an application date.')
      return
    }

    try {
      const isEditing = editingApplicationId !== null

      const url = isEditing
        ? `${APPLICATION_API_URL}/${editingApplicationId}`
        : APPLICATION_API_URL

      const method = isEditing ? 'PUT' : 'POST'

      const requestBody = {
        applicant: { id: Number(applicationFormData.applicantId) },
        jobVacancy: { id: Number(applicationFormData.jobVacancyId) },
        applicationDate: applicationFormData.applicationDate,
        status: applicationFormData.status,
        notes: applicationFormData.notes
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Application API error:', errorText)
        throw new Error('Failed to save application')
      }

      await response.json()
      await loadApplications()
      closeApplicationModal()

      alert(
        isEditing
          ? 'Application updated successfully!'
          : 'Application created successfully!'
      )
    } catch (error) {
      console.error('Application save error:', error)
      alert('Failed to save application.')
    }
  }

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }


  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {

    setFormData({
      jobTitle: '',
      department: '',
      position: '',
      description: '',
      requirements: '',
      openingDate: '',
      closingDate: '',
      status: 'Open',
    })

    setEditingVacancyId(null)
  }


  // =========================
  // OPEN ADD MODAL
  // =========================

  const openAddModal = () => {

    resetForm()

    setShowModal(true)
  }


  // =========================
  // CLOSE MODAL
  // =========================

  const closeModal = () => {

    setShowModal(false)

    resetForm()
  }


  // =========================
  // VALIDATION
  // =========================

  const validateForm = () => {

    if (!formData.jobTitle.trim()) {

      alert('Please enter a job title.')

      return false
    }


    if (!formData.department.trim()) {

      alert('Please enter a department.')

      return false
    }


    if (!formData.position.trim()) {

      alert('Please enter a position.')

      return false
    }


    if (!formData.openingDate) {

      alert('Please select an opening date.')

      return false
    }


    if (
      formData.closingDate &&
      formData.closingDate < formData.openingDate
    ) {

      alert(
        'Closing date cannot be earlier than opening date.'
      )

      return false
    }


    return true
  }


  // =========================
  // ADD / UPDATE VACANCY
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault()


    if (!validateForm()) {
      return
    }


    try {

      const isEditing =
        editingVacancyId !== null


      const url = isEditing
        ? `${API_URL}/${editingVacancyId}`
        : API_URL


      const method = isEditing
        ? 'PUT'
        : 'POST'


      const response = await fetch(url, {

        method,

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(formData),

      })


      if (!response.ok) {

        const errorText =
          await response.text()

        console.error(
          'Vacancy API error:',
          errorText
        )

        throw new Error(
          'Failed to save vacancy'
        )
      }


      await response.json()


      await loadVacancies()


      closeModal()


      alert(
        isEditing
          ? 'Job vacancy updated successfully!'
          : 'Job vacancy created successfully!'
      )

    } catch (error) {

      console.error(
        'Vacancy save error:',
        error
      )

      alert(
        'Failed to save job vacancy.'
      )
    }
  }


  // =========================
  // EDIT VACANCY
  // =========================

  const handleEdit = (vacancy) => {

    setEditingVacancyId(vacancy.id)

    setFormData({

      jobTitle:
        vacancy.jobTitle || '',

      department:
        vacancy.department || '',

      position:
        vacancy.position || '',

      description:
        vacancy.description || '',

      requirements:
        vacancy.requirements || '',

      openingDate:
        vacancy.openingDate || '',

      closingDate:
        vacancy.closingDate || '',

      status:
        vacancy.status || 'Open',

    })

    setShowModal(true)
  }


  // =========================
  // DELETE VACANCY
  // =========================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        'Are you sure you want to delete this job vacancy?'
      )


    if (!confirmed) {
      return
    }


    try {

      const response = await fetch(
        `${API_URL}/${id}`,
        {
          method: 'DELETE',
        }
      )


      if (!response.ok) {

        throw new Error(
          'Failed to delete vacancy'
        )
      }


      await loadVacancies()


      alert(
        'Job vacancy deleted successfully!'
      )

    } catch (error) {

      console.error(
        'Vacancy delete error:',
        error
      )

      alert(
        'Failed to delete job vacancy.'
      )
    }
  }


  // =========================
  // APPLICANT FORM HANDLING
  // =========================

  const resetApplicantForm = () => {
    setApplicantFormData({
      fullName: '',
      email: '',
      phone: '',
      address: '',
      resumePath: '',
      status: 'Active',
    })
    setEditingApplicantId(null)
  }

  const openAddApplicantModal = () => {
    resetApplicantForm()
    setShowApplicantModal(true)
  }

  const closeApplicantModal = () => {
    setShowApplicantModal(false)
    resetApplicantForm()
  }

  const handleApplicantChange = (e) => {
    const { name, value } = e.target
    setApplicantFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const validateApplicantForm = () => {
    if (!applicantFormData.fullName.trim()) {
      alert('Please enter applicant name.')
      return false
    }

    if (!applicantFormData.email.trim()) {
      alert('Please enter applicant email.')
      return false
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(applicantFormData.email)) {
      alert('Please enter a valid email address.')
      return false
    }

    if (!applicantFormData.phone.trim()) {
      alert('Please enter applicant phone number.')
      return false
    }

    return true
  }

  const handleApplicantSubmit = async (e) => {
    e.preventDefault()

    if (!validateApplicantForm()) {
      return
    }

    try {
      const isEditing = editingApplicantId !== null
      const url = isEditing
        ? `${APPLICANT_API_URL}/${editingApplicantId}`
        : APPLICANT_API_URL
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicantFormData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Applicant API error:', errorText)
        throw new Error('Failed to save applicant')
      }

      await response.json()
      await loadApplicants()
      closeApplicantModal()

      alert(
        isEditing
          ? 'Applicant updated successfully!'
          : 'Applicant created successfully!'
      )
    } catch (error) {
      console.error('Applicant save error:', error)
      alert('Failed to save applicant. Email may already exist.')
    }
  }

  const handleApplicantEdit = (applicant) => {
    setEditingApplicantId(applicant.id)
    setApplicantFormData({
      fullName: applicant.fullName || '',
      email: applicant.email || '',
      phone: applicant.phone || '',
      address: applicant.address || '',
      resumePath: applicant.resumePath || '',
      status: applicant.status || 'Active',
    })
    setShowApplicantModal(true)
  }

  const handleApplicantDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this applicant?'
    )

    if (!confirmed) {
      return
    }

    try {
      const response = await fetch(`${APPLICANT_API_URL}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete applicant')
      }

      await loadApplicants()
      alert('Applicant deleted successfully!')
    } catch (error) {
      console.error('Applicant delete error:', error)
      alert('Failed to delete applicant.')
    }
  }



  // =========================
  // RECRUITMENT STAGE HANDLERS
  // =========================

  const handleStageChange = (e) => {
    const { name, value } = e.target

    setStageFormData((previousData) => ({
      ...previousData,
      [name]: value
    }))
  }

  const resetStageForm = () => {
    setStageFormData({
      applicationId: '',
      stageName: 'Screening',
      stageDate: '',
      notes: '',
      status: 'Pending'
    })

    setEditingStageId(null)
  }

  const openStageModal = () => {
    resetStageForm()
    setShowStageModal(true)
  }

  const closeStageModal = () => {
    setShowStageModal(false)
    resetStageForm()
  }

  const handleStageSubmit = async (e) => {
    e.preventDefault()

    if (!stageFormData.applicationId) {
      alert('Please select an application.')
      return
    }

    if (!stageFormData.stageName) {
      alert('Please select a recruitment stage.')
      return
    }

    if (!stageFormData.stageDate) {
      alert('Please select a stage date.')
      return
    }

    try {
      const isEditing = editingStageId !== null

      const url = isEditing
        ? `${RECRUITMENT_STAGE_API_URL}/${editingStageId}`
        : RECRUITMENT_STAGE_API_URL

      const method = isEditing ? 'PUT' : 'POST'

      const requestBody = {
        application: { id: Number(stageFormData.applicationId) },
        stageName: stageFormData.stageName,
        stageDate: stageFormData.stageDate,
        notes: stageFormData.notes,
        status: stageFormData.status
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Recruitment stage API error:', errorText)
        throw new Error('Failed to save recruitment stage')
      }

      await response.json()
      await loadRecruitmentStages()
      closeStageModal()

      alert(
        isEditing
          ? 'Recruitment stage updated successfully!'
          : 'Recruitment stage created successfully!'
      )
    } catch (error) {
      console.error('Recruitment stage save error:', error)
      alert('Failed to save recruitment stage.')
    }
  }

  const handleStageEdit = (stage) => {
    setEditingStageId(stage.id)

    setStageFormData({
      applicationId: stage.application?.id
        ? String(stage.application.id)
        : '',
      stageName: stage.stageName || 'Screening',
      stageDate: stage.stageDate || '',
      notes: stage.notes || '',
      status: stage.status || 'Pending'
    })

    setShowStageModal(true)
  }

  const handleStageDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this recruitment stage?'
    )

    if (!confirmed) return

    try {
      const response = await fetch(
        `${RECRUITMENT_STAGE_API_URL}/${id}`,
        { method: 'DELETE' }
      )

      if (!response.ok) {
        throw new Error('Failed to delete recruitment stage')
      }

      await loadRecruitmentStages()
      alert('Recruitment stage deleted successfully!')
    } catch (error) {
      console.error('Recruitment stage delete error:', error)
      alert('Failed to delete recruitment stage.')
    }
  }

  // =========================
  // INTERVIEW HANDLERS
  // =========================

  const handleInterviewChange = (e) => {
    const { name, value } = e.target

    setInterviewFormData((previousData) => ({
      ...previousData,
      [name]: value
    }))
  }

  const resetInterviewForm = () => {
    setInterviewFormData({
      applicationId: '',
      interviewDate: '',
      interviewTime: '',
      interviewType: 'Online',
      interviewer: '',
      notes: '',
      status: 'Scheduled'
    })

    setEditingInterviewId(null)
  }

  const openInterviewModal = () => {
    resetInterviewForm()
    setShowInterviewModal(true)
  }

  const closeInterviewModal = () => {
    setShowInterviewModal(false)
    resetInterviewForm()
  }

  const handleInterviewSubmit = async (e) => {
    e.preventDefault()

    if (!interviewFormData.applicationId) {
      alert('Please select an application.')
      return
    }

    if (!interviewFormData.interviewDate) {
      alert('Please select an interview date.')
      return
    }

    if (!interviewFormData.interviewer.trim()) {
      alert('Please enter the interviewer name.')
      return
    }

    try {
      const isEditing = editingInterviewId !== null

      const url = isEditing
        ? `${INTERVIEW_API_URL}/${editingInterviewId}`
        : INTERVIEW_API_URL

      const method = isEditing ? 'PUT' : 'POST'

      const requestBody = {
        application: { id: Number(interviewFormData.applicationId) },
        interviewDate: interviewFormData.interviewDate,
        interviewTime: interviewFormData.interviewTime || null,
        interviewType: interviewFormData.interviewType,
        interviewer: interviewFormData.interviewer,
        notes: interviewFormData.notes,
        status: interviewFormData.status
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Interview API error:', errorText)
        throw new Error('Failed to save interview')
      }

      await response.json()
      await loadInterviews()
      closeInterviewModal()

      alert(
        isEditing
          ? 'Interview updated successfully!'
          : 'Interview created successfully!'
      )
    } catch (error) {
      console.error('Interview save error:', error)
      alert('Failed to save interview.')
    }
  }

  const handleInterviewEdit = (interview) => {
    setEditingInterviewId(interview.id)

    setInterviewFormData({
      applicationId: interview.application?.id
        ? String(interview.application.id)
        : '',
      interviewDate: interview.interviewDate || '',
      interviewTime: interview.interviewTime
        ? String(interview.interviewTime).slice(0, 5)
        : '',
      interviewType: interview.interviewType || 'Online',
      interviewer: interview.interviewer || '',
      notes: interview.notes || '',
      status: interview.status || 'Scheduled'
    })

    setShowInterviewModal(true)
  }

  const handleInterviewDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this interview?'
    )

    if (!confirmed) return

    try {
      const response = await fetch(
        `${INTERVIEW_API_URL}/${id}`,
        { method: 'DELETE' }
      )

      if (!response.ok) {
        throw new Error('Failed to delete interview')
      }

      await loadInterviews()
      alert('Interview deleted successfully!')
    } catch (error) {
      console.error('Interview delete error:', error)
      alert('Failed to delete interview.')
    }
  }


  // =========================
  // OFFER HANDLERS
  // =========================

  const handleOfferChange = (e) => {
    const { name, value } = e.target

    setOfferFormData((previousData) => ({
      ...previousData,
      [name]: value
    }))
  }

  const resetOfferForm = () => {
    setOfferFormData({
      applicationId: '',
      offerDate: '',
      joiningDate: '',
      salary: '',
      jobTitle: '',
      terms: '',
      status: 'Pending'
    })

    setEditingOfferId(null)
  }

  const openOfferModal = () => {
    resetOfferForm()
    setShowOfferModal(true)
  }

  const closeOfferModal = () => {
    setShowOfferModal(false)
    resetOfferForm()
  }

  const handleOfferSubmit = async (e) => {
    e.preventDefault()

    if (!offerFormData.applicationId) {
      alert('Please select an application.')
      return
    }

    if (!offerFormData.offerDate) {
      alert('Please select an offer date.')
      return
    }

    if (!offerFormData.jobTitle.trim()) {
      alert('Please enter the job title.')
      return
    }

    if (!offerFormData.salary || Number(offerFormData.salary) < 0) {
      alert('Please enter a valid non-negative salary.')
      return
    }

    if (
      offerFormData.joiningDate &&
      offerFormData.joiningDate < offerFormData.offerDate
    ) {
      alert('Joining date cannot be earlier than offer date.')
      return
    }

    try {
      const isEditing = editingOfferId !== null

      const url = isEditing
        ? `${OFFER_API_URL}/${editingOfferId}`
        : OFFER_API_URL

      const method = isEditing ? 'PUT' : 'POST'

      const requestBody = {
        application: {
          id: Number(offerFormData.applicationId)
        },
        offerDate: offerFormData.offerDate,
        joiningDate: offerFormData.joiningDate || null,
        salary: Number(offerFormData.salary),
        jobTitle: offerFormData.jobTitle,
        terms: offerFormData.terms,
        status: offerFormData.status
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Offer API error:', errorText)
        throw new Error('Failed to save offer')
      }

      await response.json()
      await loadOffers()
      closeOfferModal()

      alert(
        isEditing
          ? 'Offer updated successfully!'
          : 'Offer created successfully!'
      )
    } catch (error) {
      console.error('Offer save error:', error)
      alert('Failed to save offer.')
    }
  }

  const handleOfferEdit = (offer) => {
    setEditingOfferId(offer.id)

    setOfferFormData({
      applicationId: offer.application?.id
        ? String(offer.application.id)
        : '',
      offerDate: offer.offerDate || '',
      joiningDate: offer.joiningDate || '',
      salary:
        offer.salary !== null && offer.salary !== undefined
          ? String(offer.salary)
          : '',
      jobTitle: offer.jobTitle || '',
      terms: offer.terms || '',
      status: offer.status || 'Pending'
    })

    setShowOfferModal(true)
  }

  const handleOfferDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this offer?'
    )

    if (!confirmed) return

    try {
      const response = await fetch(
        `${OFFER_API_URL}/${id}`,
        { method: 'DELETE' }
      )

      if (!response.ok) {
        throw new Error('Failed to delete offer')
      }

      await loadOffers()
      alert('Offer deleted successfully!')
    } catch (error) {
      console.error('Offer delete error:', error)
      alert('Failed to delete offer.')
    }
  }


  // =========================
  // ONBOARDING HANDLERS
  // =========================

  const handleOnboardingChange = (e) => {
    const { name, value } = e.target

    setOnboardingFormData((previousData) => ({
      ...previousData,
      [name]: value
    }))
  }

  const resetOnboardingForm = () => {
    setOnboardingFormData({
      applicationId: '',
      startDate: '',
      completionDate: '',
      status: 'Pending',
      notes: ''
    })

    setEditingOnboardingId(null)
  }

  const openOnboardingModal = () => {
    resetOnboardingForm()
    setShowOnboardingModal(true)
  }

  const closeOnboardingModal = () => {
    setShowOnboardingModal(false)
    resetOnboardingForm()
  }

  const handleOnboardingSubmit = async (e) => {
    e.preventDefault()

    if (!onboardingFormData.applicationId) {
      alert('Please select an application.')
      return
    }

    if (!onboardingFormData.startDate) {
      alert('Please select a start date.')
      return
    }

    if (
      onboardingFormData.completionDate &&
      onboardingFormData.completionDate < onboardingFormData.startDate
    ) {
      alert('Completion date cannot be earlier than start date.')
      return
    }

    try {
      const isEditing = editingOnboardingId !== null

      const url = isEditing
        ? `${ONBOARDING_API_URL}/${editingOnboardingId}`
        : ONBOARDING_API_URL

      const method = isEditing ? 'PUT' : 'POST'

      const requestBody = {
        application: {
          id: Number(onboardingFormData.applicationId)
        },
        startDate: onboardingFormData.startDate,
        completionDate: onboardingFormData.completionDate || null,
        status: onboardingFormData.status,
        notes: onboardingFormData.notes
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Onboarding API error:', errorText)
        throw new Error('Failed to save onboarding record')
      }

      await response.json()
      await loadOnboardings()
      closeOnboardingModal()

      alert(
        isEditing
          ? 'Onboarding record updated successfully!'
          : 'Onboarding record created successfully!'
      )
    } catch (error) {
      console.error('Onboarding save error:', error)
      alert('Failed to save onboarding record.')
    }
  }

  const handleOnboardingEdit = (onboarding) => {
    setEditingOnboardingId(onboarding.id)

    setOnboardingFormData({
      applicationId: onboarding.application?.id
        ? String(onboarding.application.id)
        : '',
      startDate: onboarding.startDate || '',
      completionDate: onboarding.completionDate || '',
      status: onboarding.status || 'Pending',
      notes: onboarding.notes || ''
    })

    setShowOnboardingModal(true)
  }

  const handleOnboardingDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this onboarding record?'
    )

    if (!confirmed) return

    try {
      const response = await fetch(
        `${ONBOARDING_API_URL}/${id}`,
        { method: 'DELETE' }
      )

      if (!response.ok) {
        throw new Error('Failed to delete onboarding record')
      }

      await loadOnboardings()
      alert('Onboarding record deleted successfully!')
    } catch (error) {
      console.error('Onboarding delete error:', error)
      alert('Failed to delete onboarding record.')
    }
  }



  // =========================
  // ONBOARDING TASK HANDLERS
  // =========================

  const handleOnboardingTaskChange = (e) => {
    const { name, value } = e.target

    setOnboardingTaskFormData((previousData) => ({
      ...previousData,
      [name]: value
    }))
  }

  const resetOnboardingTaskForm = () => {
    setOnboardingTaskFormData({
      onboardingId: '',
      taskName: '',
      description: '',
      dueDate: '',
      status: 'Pending'
    })
    setEditingOnboardingTaskId(null)
  }

  const openOnboardingTaskModal = () => {
    resetOnboardingTaskForm()
    setShowOnboardingTaskModal(true)
  }

  const closeOnboardingTaskModal = () => {
    setShowOnboardingTaskModal(false)
    resetOnboardingTaskForm()
  }

  const handleOnboardingTaskSubmit = async (e) => {
    e.preventDefault()

    if (!onboardingTaskFormData.onboardingId) {
      alert('Please select an onboarding record.')
      return
    }

    if (!onboardingTaskFormData.taskName.trim()) {
      alert('Please enter a task name.')
      return
    }

    const selectedOnboarding = onboardings.find(
      (onboarding) => onboarding.id === Number(onboardingTaskFormData.onboardingId)
    )

    if (
      onboardingTaskFormData.dueDate &&
      selectedOnboarding?.startDate &&
      onboardingTaskFormData.dueDate < selectedOnboarding.startDate
    ) {
      alert('Due date cannot be earlier than onboarding start date.')
      return
    }

    try {
      const isEditing = editingOnboardingTaskId !== null
      const url = isEditing
        ? `${ONBOARDING_TASK_API_URL}/${editingOnboardingTaskId}`
        : ONBOARDING_TASK_API_URL
      const method = isEditing ? 'PUT' : 'POST'

      const requestBody = {
        onboarding: { id: Number(onboardingTaskFormData.onboardingId) },
        taskName: onboardingTaskFormData.taskName.trim(),
        description: onboardingTaskFormData.description,
        dueDate: onboardingTaskFormData.dueDate || null,
        status: onboardingTaskFormData.status
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Onboarding task API error:', errorText)
        throw new Error('Failed to save onboarding task')
      }

      await response.json()
      await loadOnboardingTasks()
      closeOnboardingTaskModal()

      alert(
        isEditing
          ? 'Onboarding task updated successfully!'
          : 'Onboarding task created successfully!'
      )
    } catch (error) {
      console.error('Onboarding task save error:', error)
      alert('Failed to save onboarding task.')
    }
  }

  const handleOnboardingTaskEdit = (task) => {
    setEditingOnboardingTaskId(task.id)
    setOnboardingTaskFormData({
      onboardingId: task.onboarding?.id
        ? String(task.onboarding.id)
        : '',
      taskName: task.taskName || '',
      description: task.description || '',
      dueDate: task.dueDate || '',
      status: task.status || 'Pending'
    })
    setShowOnboardingTaskModal(true)
  }

  const handleOnboardingTaskDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this onboarding task?'
    )

    if (!confirmed) return

    try {
      const response = await fetch(
        `${ONBOARDING_TASK_API_URL}/${id}`,
        { method: 'DELETE' }
      )

      if (!response.ok) {
        throw new Error('Failed to delete onboarding task')
      }

      await loadOnboardingTasks()
      alert('Onboarding task deleted successfully!')
    } catch (error) {
      console.error('Onboarding task delete error:', error)
      alert('Failed to delete onboarding task.')
    }
  }

  // =========================
  // DOCUMENT HANDLERS
  // =========================

  const handleDocumentChange = (e) => {
    const { name, value } = e.target

    setDocumentFormData((previousData) => ({
      ...previousData,
      [name]: value
    }))
  }

  const resetDocumentForm = () => {
    setDocumentFormData({
      onboardingId: '',
      documentName: '',
      documentType: 'Identity',
      submittedDate: '',
      status: 'Pending',
      notes: ''
    })
    setEditingDocumentId(null)
  }

  const openDocumentModal = () => {
    resetDocumentForm()
    setShowDocumentModal(true)
  }

  const closeDocumentModal = () => {
    setShowDocumentModal(false)
    resetDocumentForm()
  }

  const handleDocumentSubmit = async (e) => {
    e.preventDefault()

    if (!documentFormData.onboardingId) {
      alert('Please select an onboarding record.')
      return
    }

    if (!documentFormData.documentName.trim()) {
      alert('Please enter the document name.')
      return
    }

    try {
      const isEditing = editingDocumentId !== null
      const url = isEditing
        ? `${DOCUMENT_API_URL}/${editingDocumentId}`
        : DOCUMENT_API_URL
      const method = isEditing ? 'PUT' : 'POST'

      const requestBody = {
        onboarding: { id: Number(documentFormData.onboardingId) },
        documentName: documentFormData.documentName.trim(),
        documentType: documentFormData.documentType,
        submittedDate: documentFormData.submittedDate || null,
        status: documentFormData.status,
        notes: documentFormData.notes
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Document API error:', errorText)
        throw new Error('Failed to save document')
      }

      await response.json()
      await loadDocuments()
      closeDocumentModal()

      alert(
        isEditing
          ? 'Document updated successfully!'
          : 'Document created successfully!'
      )
    } catch (error) {
      console.error('Document save error:', error)
      alert('Failed to save document.')
    }
  }

  const handleDocumentEdit = (document) => {
    setEditingDocumentId(document.id)
    setDocumentFormData({
      onboardingId: document.onboarding?.id
        ? String(document.onboarding.id)
        : '',
      documentName: document.documentName || '',
      documentType: document.documentType || 'Identity',
      submittedDate: document.submittedDate || '',
      status: document.status || 'Pending',
      notes: document.notes || ''
    })
    setShowDocumentModal(true)
  }

  const handleDocumentDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this document record?'
    )

    if (!confirmed) return

    try {
      const response = await fetch(
        `${DOCUMENT_API_URL}/${id}`,
        { method: 'DELETE' }
      )

      if (!response.ok) {
        throw new Error('Failed to delete document')
      }

      await loadDocuments()
      alert('Document deleted successfully!')
    } catch (error) {
      console.error('Document delete error:', error)
      alert('Failed to delete document.')
    }
  }

  // =========================
  // APPLICATION EDIT
  // =========================

  const handleApplicationEdit = (application) => {
    setEditingApplicationId(application.id)

    setApplicationFormData({
      applicantId: application.applicant?.id
        ? String(application.applicant.id)
        : '',
      jobVacancyId: application.jobVacancy?.id
        ? String(application.jobVacancy.id)
        : '',
      applicationDate: application.applicationDate || '',
      status: application.status || 'Applied',
      notes: application.notes || ''
    })

    setShowApplicationModal(true)
  }


  // =========================
  // APPLICATION DELETE
  // =========================

  const handleApplicationDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this application?'
    )

    if (!confirmed) return

    try {
      const response = await fetch(
        `${APPLICATION_API_URL}/${id}`,
        { method: 'DELETE' }
      )

      if (!response.ok) {
        throw new Error('Failed to delete application')
      }

      await loadApplications()
      alert('Application deleted successfully!')
    } catch (error) {
      console.error('Application delete error:', error)
      alert('Failed to delete application.')
    }
  }


  // =========================
  // FILTER APPLICATIONS
  // =========================

  const filteredApplications = applications.filter((application) => {
    const applicantName =
      application.applicant?.fullName?.toLowerCase() || ''

    const jobTitle =
      application.jobVacancy?.jobTitle?.toLowerCase() || ''

    const status =
      application.status?.toLowerCase() || ''

    const search = applicationSearchTerm.toLowerCase()

    const matchesSearch =
      applicantName.includes(search) ||
      jobTitle.includes(search) ||
      status.includes(search)

    const matchesStatus =
      applicationStatusFilter === 'All' ||
      application.status === applicationStatusFilter

    return matchesSearch && matchesStatus
  })


  // =========================
  // APPLICATION SUMMARY
  // =========================

  const totalApplications = applications.length

  const appliedApplications = applications.filter(
    (application) => application.status === 'Applied'
  ).length

  const shortlistedApplications = applications.filter(
    (application) => application.status === 'Shortlisted'
  ).length

  const selectedApplications = applications.filter(
    (application) => application.status === 'Selected'
  ).length

  const rejectedApplications = applications.filter(
    (application) => application.status === 'Rejected'
  ).length


  // =========================
  // FILTER RECRUITMENT STAGES
  // =========================

  const filteredRecruitmentStages = recruitmentStages.filter((stage) => {
    const applicantName =
      stage.application?.applicant?.fullName?.toLowerCase() || ''

    const jobTitle =
      stage.application?.jobVacancy?.jobTitle?.toLowerCase() || ''

    const stageName =
      stage.stageName?.toLowerCase() || ''

    const status =
      stage.status?.toLowerCase() || ''

    const search = stageSearchTerm.toLowerCase()

    const matchesSearch =
      applicantName.includes(search) ||
      jobTitle.includes(search) ||
      stageName.includes(search) ||
      status.includes(search)

    const matchesStatus =
      stageStatusFilter === 'All' ||
      stage.status === stageStatusFilter

    return matchesSearch && matchesStatus
  })

  const totalRecruitmentStages = recruitmentStages.length

  const pendingRecruitmentStages = recruitmentStages.filter(
    (stage) => stage.status === 'Pending'
  ).length

  const completedRecruitmentStages = recruitmentStages.filter(
    (stage) => stage.status === 'Completed'
  ).length

  const inProgressRecruitmentStages = recruitmentStages.filter(
    (stage) => stage.status === 'In Progress'
  ).length

  // =========================
  // FILTER INTERVIEWS
  // =========================

  const filteredInterviews = interviews.filter((interview) => {
    const applicantName =
      interview.application?.applicant?.fullName?.toLowerCase() || ''

    const jobTitle =
      interview.application?.jobVacancy?.jobTitle?.toLowerCase() || ''

    const interviewer =
      interview.interviewer?.toLowerCase() || ''

    const interviewType =
      interview.interviewType?.toLowerCase() || ''

    const status =
      interview.status?.toLowerCase() || ''

    const search = interviewSearchTerm.toLowerCase()

    const matchesSearch =
      applicantName.includes(search) ||
      jobTitle.includes(search) ||
      interviewer.includes(search) ||
      interviewType.includes(search) ||
      status.includes(search)

    const matchesStatus =
      interviewStatusFilter === 'All' ||
      interview.status === interviewStatusFilter

    return matchesSearch && matchesStatus
  })

  const totalInterviews = interviews.length

  const scheduledInterviews = interviews.filter(
    (interview) => interview.status === 'Scheduled'
  ).length

  const completedInterviews = interviews.filter(
    (interview) => interview.status === 'Completed'
  ).length

  const cancelledInterviews = interviews.filter(
    (interview) => interview.status === 'Cancelled'
  ).length


  // =========================
  // FILTER OFFERS
  // =========================

  const filteredOffers = offers.filter((offer) => {
    const applicantName =
      offer.application?.applicant?.fullName?.toLowerCase() || ''

    const jobTitle =
      offer.jobTitle?.toLowerCase() ||
      offer.application?.jobVacancy?.jobTitle?.toLowerCase() ||
      ''

    const status =
      offer.status?.toLowerCase() || ''

    const search = offerSearchTerm.toLowerCase()

    const matchesSearch =
      applicantName.includes(search) ||
      jobTitle.includes(search) ||
      status.includes(search)

    const matchesStatus =
      offerStatusFilter === 'All' ||
      offer.status === offerStatusFilter

    return matchesSearch && matchesStatus
  })

  const totalOffers = offers.length

  const pendingOffers = offers.filter(
    (offer) => offer.status === 'Pending'
  ).length

  const acceptedOffers = offers.filter(
    (offer) => offer.status === 'Accepted'
  ).length

  const rejectedOffers = offers.filter(
    (offer) => offer.status === 'Rejected'
  ).length

  const expiredOffers = offers.filter(
    (offer) => offer.status === 'Expired'
  ).length


  // =========================
  // FILTER ONBOARDINGS
  // =========================

  const filteredOnboardings = onboardings.filter((onboarding) => {
    const applicantName =
      onboarding.application?.applicant?.fullName?.toLowerCase() || ''

    const jobTitle =
      onboarding.application?.jobVacancy?.jobTitle?.toLowerCase() || ''

    const status =
      onboarding.status?.toLowerCase() || ''

    const search = onboardingSearchTerm.toLowerCase()

    const matchesSearch =
      applicantName.includes(search) ||
      jobTitle.includes(search) ||
      status.includes(search)

    const matchesStatus =
      onboardingStatusFilter === 'All' ||
      onboarding.status === onboardingStatusFilter

    return matchesSearch && matchesStatus
  })

  const totalOnboardings = onboardings.length

  const pendingOnboardings = onboardings.filter(
    (onboarding) => onboarding.status === 'Pending'
  ).length

  const inProgressOnboardings = onboardings.filter(
    (onboarding) => onboarding.status === 'In Progress'
  ).length

  const completedOnboardings = onboardings.filter(
    (onboarding) => onboarding.status === 'Completed'
  ).length

  const cancelledOnboardings = onboardings.filter(
    (onboarding) => onboarding.status === 'Cancelled'
  ).length


  // =========================

  // FILTER ONBOARDING TASKS

  const filteredOnboardingTasks = onboardingTasks.filter((task) => {
    const applicantName =
      task.onboarding?.application?.applicant?.fullName?.toLowerCase() || ''
    const taskName = task.taskName?.toLowerCase() || ''
    const description = task.description?.toLowerCase() || ''
    const status = task.status?.toLowerCase() || ''
    const search = onboardingTaskSearchTerm.toLowerCase()

    const matchesSearch =
      applicantName.includes(search) ||
      taskName.includes(search) ||
      description.includes(search)

    const matchesStatus =
      onboardingTaskStatusFilter === 'All' ||
      task.status === onboardingTaskStatusFilter

    return matchesSearch && matchesStatus
  })

  const totalOnboardingTasks = onboardingTasks.length
  const pendingOnboardingTasks = onboardingTasks.filter(
    (task) => task.status === 'Pending'
  ).length
  const inProgressOnboardingTasks = onboardingTasks.filter(
    (task) => task.status === 'In Progress'
  ).length
  const completedOnboardingTasks = onboardingTasks.filter(
    (task) => task.status === 'Completed'
  ).length
  const cancelledOnboardingTasks = onboardingTasks.filter(
    (task) => task.status === 'Cancelled'
  ).length

  // FILTER DOCUMENTS

  const filteredDocuments = documents.filter((document) => {
    const applicantName =
      document.onboarding?.application?.applicant?.fullName?.toLowerCase() || ''
    const documentName = document.documentName?.toLowerCase() || ''
    const documentType = document.documentType?.toLowerCase() || ''
    const notes = document.notes?.toLowerCase() || ''
    const status = document.status?.toLowerCase() || ''
    const search = documentSearchTerm.toLowerCase()

    const matchesSearch =
      applicantName.includes(search) ||
      documentName.includes(search) ||
      documentType.includes(search) ||
      notes.includes(search)

    const matchesStatus =
      documentStatusFilter === 'All' ||
      document.status === documentStatusFilter

    const matchesType =
      documentTypeFilter === 'All' ||
      document.documentType === documentTypeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const totalDocuments = documents.length
  const pendingDocuments = documents.filter(
    (document) => document.status === 'Pending'
  ).length
  const submittedDocuments = documents.filter(
    (document) => document.status === 'Submitted'
  ).length
  const verifiedDocuments = documents.filter(
    (document) => document.status === 'Verified'
  ).length
  const rejectedDocuments = documents.filter(
    (document) => document.status === 'Rejected'
  ).length

  // FILTER APPLICANTS
  // =========================

  const filteredApplicants = applicants.filter((applicant) => {
    const search = applicantSearchTerm.toLowerCase()

    const matchesSearch =
      applicant.fullName?.toLowerCase().includes(search) ||
      applicant.email?.toLowerCase().includes(search) ||
      applicant.phone?.toLowerCase().includes(search)

    const matchesStatus =
      applicantStatusFilter === 'All' ||
      applicant.status === applicantStatusFilter

    return matchesSearch && matchesStatus
  })


  // =========================
  // APPLICANT SUMMARY
  // =========================

  const totalApplicants = applicants.length

  const activeApplicants = applicants.filter(
    (applicant) => applicant.status === 'Active'
  ).length

  const inactiveApplicants = applicants.filter(
    (applicant) => applicant.status === 'Inactive'
  ).length


  // =========================
  // FILTER VACANCIES
  // =========================

  const filteredVacancies =
    vacancies.filter((vacancy) => {

      const matchesSearch =
        vacancy.jobTitle
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        vacancy.department
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          ) ||
        vacancy.position
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )


      const matchesStatus =
        statusFilter === 'All' ||
        vacancy.status === statusFilter


      return (
        matchesSearch &&
        matchesStatus
      )
    })


  // =========================
  // SUMMARY
  // =========================

  const totalVacancies =
    vacancies.length


  const openVacancies =
    vacancies.filter(
      (vacancy) =>
        vacancy.status === 'Open'
    ).length


  const closedVacancies =
    vacancies.filter(
      (vacancy) =>
        vacancy.status === 'Closed'
    ).length


  // =========================
  // UI
  // =========================

  return (

    <div className="recruitment-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="recruitment-header">

        <div>

          <h1>
            Recruitment & Onboarding
          </h1>

          <p>
            Manage job vacancies and recruitment activities
          </p>

        </div>


        <button
          className="recruitment-primary-btn"
          onClick={openAddModal}
        >
          + Add Job Vacancy
        </button>

      </div>


      {/* =========================
          SUMMARY CARDS
      ========================= */}

      <div className="recruitment-summary">

        <div className="recruitment-summary-card">

          <span>
            Total Vacancies
          </span>

          <strong>
            {totalVacancies}
          </strong>

        </div>


        <div className="recruitment-summary-card">

          <span>
            Open Vacancies
          </span>

          <strong>
            {openVacancies}
          </strong>

        </div>


        <div className="recruitment-summary-card">

          <span>
            Closed Vacancies
          </span>

          <strong>
            {closedVacancies}
          </strong>

        </div>

      </div>


      {/* =========================
          VACANCY CARD
      ========================= */}

      <div className="recruitment-card">

        <div className="recruitment-card-header">

          <div>

            <h2>
              Job Vacancies
            </h2>

            <p>
              Manage available job positions
            </p>

          </div>


          {/* SEARCH + FILTER */}

          <div className="recruitment-filters">

            <input
              type="text"
              placeholder="Search vacancies..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
            />


            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >

              <option value="All">
                All Status
              </option>

              <option value="Open">
                Open
              </option>

              <option value="Closed">
                Closed
              </option>

            </select>

          </div>

        </div>


        {/* =========================
            TABLE
        ========================= */}

        <div className="table-container">

          <table className="recruitment-table">

            <thead>

              <tr>

                <th>
                  Job Title
                </th>

                <th>
                  Department
                </th>

                <th>
                  Position
                </th>

                <th>
                  Opening Date
                </th>

                <th>
                  Closing Date
                </th>

                <th>
                  Status
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="7"
                    style={{
                      textAlign: 'center',
                      padding: '40px',
                    }}
                  >
                    Loading vacancies...
                  </td>

                </tr>

              ) : filteredVacancies.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    style={{
                      textAlign: 'center',
                      padding: '40px',
                    }}
                  >
                    No job vacancies found.
                  </td>

                </tr>

              ) : (

                filteredVacancies.map(
                  (vacancy) => (

                    <tr
                      key={vacancy.id}
                    >

                      <td>

                        <strong>
                          {vacancy.jobTitle}
                        </strong>

                      </td>


                      <td>
                        {vacancy.department}
                      </td>


                      <td>
                        {vacancy.position}
                      </td>


                      <td>
                        {vacancy.openingDate || '-'}
                      </td>


                      <td>
                        {vacancy.closingDate || '-'}
                      </td>


                      <td>

                        <span
                          className={
                            vacancy.status === 'Open'
                              ? 'recruitment-status open'
                              : 'recruitment-status closed'
                          }
                        >
                          {vacancy.status}
                        </span>

                      </td>


                      <td>

                        <div className="recruitment-actions">

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(
                                vacancy
                              )
                            }
                            className="recruitment-edit-btn"
                          >
                            Edit
                          </button>


                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                vacancy.id
                              )
                            }
                            className="recruitment-delete-btn"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>



      {/* =========================
          APPLICATIONS SECTION
      ========================= */}

      <div className="recruitment-card">
        <div className="recruitment-card-header">
          <div>
            <h2>Applications</h2>
            <p>Manage applicant job applications</p>
          </div>

          <div className="recruitment-filters">
            <input
              type="text"
              placeholder="Search applications..."
              value={applicationSearchTerm}
              onChange={(e) => setApplicationSearchTerm(e.target.value)}
            />

            <select
              value={applicationStatusFilter}
              onChange={(e) => setApplicationStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Applied">Applied</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button
              type="button"
              className="recruitment-primary-btn"
              onClick={openApplicationModal}
            >
              + Add Application
            </button>
          </div>
        </div>

        <div className="recruitment-summary" style={{ padding: '20px' }}>
          <div className="recruitment-summary-card">
            <span>Total Applications</span>
            <strong>{totalApplications}</strong>
          </div>
          <div className="recruitment-summary-card">
            <span>Applied</span>
            <strong>{appliedApplications}</strong>
          </div>
          <div className="recruitment-summary-card">
            <span>Shortlisted</span>
            <strong>{shortlistedApplications}</strong>
          </div>
          <div className="recruitment-summary-card">
            <span>Selected</span>
            <strong>{selectedApplications}</strong>
          </div>
          <div className="recruitment-summary-card">
            <span>Rejected</span>
            <strong>{rejectedApplications}</strong>
          </div>
        </div>

        <div className="table-container">
          <table className="recruitment-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Job Vacancy</th>
                <th>Application Date</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: 'center', padding: '40px' }}
                  >
                    No applications found.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((application) => (
                  <tr key={application.id}>
                    <td>
                      <strong>
                        {application.applicant?.fullName || 'Unknown Applicant'}
                      </strong>
                    </td>
                    <td>
                      {application.jobVacancy?.jobTitle || 'Unknown Vacancy'}
                    </td>
                    <td>{application.applicationDate || '-'}</td>
                    <td>
                      <span
                        className={
                          application.status === 'Rejected'
                            ? 'recruitment-status closed'
                            : 'recruitment-status open'
                        }
                      >
                        {application.status || 'Applied'}
                      </span>
                    </td>
                    <td>{application.notes || '-'}</td>
                    <td>
                      <div className="recruitment-actions">
                        <button
                          type="button"
                          onClick={() => handleApplicationEdit(application)}
                          className="recruitment-edit-btn"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApplicationDelete(application.id)}
                          className="recruitment-delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* =========================
          ADD / EDIT APPLICATION MODAL
      ========================= */}

      {showApplicationModal && (
        <div className="modal-overlay">
          <div className="modal-content recruitment-modal">
            <h2>
              {editingApplicationId !== null
                ? 'Edit Application'
                : 'Add Application'}
            </h2>

            <p className="modal-description">
              Enter application details
            </p>

            <form onSubmit={handleApplicationSubmit}>
              <label>
                Applicant
                <select
                  name="applicantId"
                  value={applicationFormData.applicantId}
                  onChange={handleApplicationChange}
                  required
                >
                  <option value="">Select Applicant</option>
                  {applicants.map((applicant) => (
                    <option key={applicant.id} value={applicant.id}>
                      {applicant.fullName}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Job Vacancy
                <select
                  name="jobVacancyId"
                  value={applicationFormData.jobVacancyId}
                  onChange={handleApplicationChange}
                  required
                >
                  <option value="">Select Job Vacancy</option>
                  {vacancies.map((vacancy) => (
                    <option key={vacancy.id} value={vacancy.id}>
                      {vacancy.jobTitle}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Application Date
                <input
                  type="date"
                  name="applicationDate"
                  value={applicationFormData.applicationDate}
                  onChange={handleApplicationChange}
                  required
                />
              </label>

              <label>
                Status
                <select
                  name="status"
                  value={applicationFormData.status}
                  onChange={handleApplicationChange}
                >
                  <option value="Applied">Applied</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </label>

              <label>
                Notes
                <textarea
                  name="notes"
                  value={applicationFormData.notes}
                  onChange={handleApplicationChange}
                  placeholder="Enter notes"
                  rows="4"
                />
              </label>

              <button
                type="submit"
                className="recruitment-primary-btn"
              >
                {editingApplicationId !== null
                  ? 'Update Application'
                  : 'Create Application'}
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={closeApplicationModal}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}


      {/* =========================
          RECRUITMENT STAGES SECTION
      ========================= */}

      <div className="recruitment-card">
        <div className="recruitment-card-header">
          <div>
            <h2>Recruitment Stages</h2>
            <p>Track the recruitment progress of applications</p>
          </div>

          <div className="recruitment-filters">
            <input
              type="text"
              placeholder="Search stages..."
              value={stageSearchTerm}
              onChange={(e) => setStageSearchTerm(e.target.value)}
            />

            <select
              value={stageStatusFilter}
              onChange={(e) => setStageStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <button
              type="button"
              className="recruitment-primary-btn"
              onClick={openStageModal}
            >
              + Add Stage
            </button>
          </div>
        </div>

        <div className="recruitment-summary" style={{ padding: '20px' }}>
          <div className="recruitment-summary-card">
            <span>Total Stages</span>
            <strong>{totalRecruitmentStages}</strong>
          </div>
          <div className="recruitment-summary-card">
            <span>Pending</span>
            <strong>{pendingRecruitmentStages}</strong>
          </div>
          <div className="recruitment-summary-card">
            <span>In Progress</span>
            <strong>{inProgressRecruitmentStages}</strong>
          </div>
          <div className="recruitment-summary-card">
            <span>Completed</span>
            <strong>{completedRecruitmentStages}</strong>
          </div>
        </div>

        <div className="table-container">
          <table className="recruitment-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Job Vacancy</th>
                <th>Stage</th>
                <th>Stage Date</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecruitmentStages.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                    No recruitment stages found.
                  </td>
                </tr>
              ) : (
                filteredRecruitmentStages.map((stage) => (
                  <tr key={stage.id}>
                    <td>
                      <strong>
                        {stage.application?.applicant?.fullName || 'Unknown Applicant'}
                      </strong>
                    </td>
                    <td>
                      {stage.application?.jobVacancy?.jobTitle || 'Unknown Vacancy'}
                    </td>
                    <td>{stage.stageName || '-'}</td>
                    <td>{stage.stageDate || '-'}</td>
                    <td>
                      <span
                        className={
                          stage.status === 'Completed'
                            ? 'recruitment-status open'
                            : 'recruitment-status closed'
                        }
                      >
                        {stage.status || 'Pending'}
                      </span>
                    </td>
                    <td>{stage.notes || '-'}</td>
                    <td>
                      <div className="recruitment-actions">
                        <button
                          type="button"
                          onClick={() => handleStageEdit(stage)}
                          className="recruitment-edit-btn"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStageDelete(stage.id)}
                          className="recruitment-delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showStageModal && (
        <div className="modal-overlay">
          <div className="modal-content recruitment-modal">
            <h2>
              {editingStageId !== null
                ? 'Edit Recruitment Stage'
                : 'Add Recruitment Stage'}
            </h2>

            <p className="modal-description">
              Track an application through the recruitment process
            </p>

            <form onSubmit={handleStageSubmit}>
              <label>
                Application
                <select
                  name="applicationId"
                  value={stageFormData.applicationId}
                  onChange={handleStageChange}
                  required
                >
                  <option value="">Select Application</option>
                  {applications.map((application) => (
                    <option key={application.id} value={application.id}>
                      {application.applicant?.fullName || 'Unknown Applicant'}
                      {' - '}
                      {application.jobVacancy?.jobTitle || 'Unknown Vacancy'}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Stage
                <select
                  name="stageName"
                  value={stageFormData.stageName}
                  onChange={handleStageChange}
                  required
                >
                  <option value="Screening">Screening</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </label>

              <label>
                Stage Date
                <input
                  type="date"
                  name="stageDate"
                  value={stageFormData.stageDate}
                  onChange={handleStageChange}
                  required
                />
              </label>

              <label>
                Status
                <select
                  name="status"
                  value={stageFormData.status}
                  onChange={handleStageChange}
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>

              <label>
                Notes
                <textarea
                  name="notes"
                  value={stageFormData.notes}
                  onChange={handleStageChange}
                  placeholder="Enter stage notes"
                  rows="4"
                />
              </label>

              <button type="submit" className="recruitment-primary-btn">
                {editingStageId !== null ? 'Update Stage' : 'Create Stage'}
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={closeStageModal}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          INTERVIEWS SECTION
      ========================= */}

      <div className="recruitment-card">
        <div className="recruitment-card-header">
          <div>
            <h2>Interviews</h2>
            <p>Schedule and manage candidate interviews</p>
          </div>

          <div className="recruitment-filters">
            <input
              type="text"
              placeholder="Search interviews..."
              value={interviewSearchTerm}
              onChange={(e) => setInterviewSearchTerm(e.target.value)}
            />

            <select
              value={interviewStatusFilter}
              onChange={(e) => setInterviewStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              type="button"
              className="recruitment-primary-btn"
              onClick={openInterviewModal}
            >
              + Add Interview
            </button>
          </div>
        </div>

        <div className="recruitment-summary" style={{ padding: '20px' }}>
          <div className="recruitment-summary-card">
            <span>Total Interviews</span>
            <strong>{totalInterviews}</strong>
          </div>
          <div className="recruitment-summary-card">
            <span>Scheduled</span>
            <strong>{scheduledInterviews}</strong>
          </div>
          <div className="recruitment-summary-card">
            <span>Completed</span>
            <strong>{completedInterviews}</strong>
          </div>
          <div className="recruitment-summary-card">
            <span>Cancelled</span>
            <strong>{cancelledInterviews}</strong>
          </div>
        </div>

        <div className="table-container">
          <table className="recruitment-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Job Vacancy</th>
                <th>Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>Interviewer</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredInterviews.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    style={{ textAlign: 'center', padding: '40px' }}
                  >
                    No interviews found.
                  </td>
                </tr>
              ) : (
                filteredInterviews.map((interview) => (
                  <tr key={interview.id}>
                    <td>
                      <strong>
                        {interview.application?.applicant?.fullName ||
                          'Unknown Applicant'}
                      </strong>
                    </td>
                    <td>
                      {interview.application?.jobVacancy?.jobTitle ||
                        'Unknown Vacancy'}
                    </td>
                    <td>{interview.interviewDate || '-'}</td>
                    <td>
                      {interview.interviewTime
                        ? String(interview.interviewTime).slice(0, 5)
                        : '-'}
                    </td>
                    <td>{interview.interviewType || '-'}</td>
                    <td>{interview.interviewer || '-'}</td>
                    <td>
                      <span
                        className={
                          interview.status === 'Scheduled'
                            ? 'recruitment-status open'
                            : interview.status === 'Completed'
                              ? 'recruitment-status open'
                              : 'recruitment-status closed'
                        }
                      >
                        {interview.status || 'Scheduled'}
                      </span>
                    </td>
                    <td>{interview.notes || '-'}</td>
                    <td>
                      <div className="recruitment-actions">
                        <button
                          type="button"
                          onClick={() => handleInterviewEdit(interview)}
                          className="recruitment-edit-btn"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleInterviewDelete(interview.id)}
                          className="recruitment-delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showInterviewModal && (
        <div className="modal-overlay">
          <div className="modal-content recruitment-modal">
            <h2>
              {editingInterviewId !== null
                ? 'Edit Interview'
                : 'Add Interview'}
            </h2>

            <p className="modal-description">
              Schedule an interview for an application
            </p>

            <form onSubmit={handleInterviewSubmit}>
              <label>
                Application
                <select
                  name="applicationId"
                  value={interviewFormData.applicationId}
                  onChange={handleInterviewChange}
                  required
                >
                  <option value="">Select Application</option>
                  {applications.map((application) => (
                    <option key={application.id} value={application.id}>
                      {application.applicant?.fullName ||
                        'Unknown Applicant'}
                      {' - '}
                      {application.jobVacancy?.jobTitle ||
                        'Unknown Vacancy'}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Interview Date
                <input
                  type="date"
                  name="interviewDate"
                  value={interviewFormData.interviewDate}
                  onChange={handleInterviewChange}
                  required
                />
              </label>

              <label>
                Interview Time
                <input
                  type="time"
                  name="interviewTime"
                  value={interviewFormData.interviewTime}
                  onChange={handleInterviewChange}
                />
              </label>

              <label>
                Interview Type
                <select
                  name="interviewType"
                  value={interviewFormData.interviewType}
                  onChange={handleInterviewChange}
                >
                  <option value="Online">Online</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Phone">Phone</option>
                </select>
              </label>

              <label>
                Interviewer
                <input
                  type="text"
                  name="interviewer"
                  value={interviewFormData.interviewer}
                  onChange={handleInterviewChange}
                  placeholder="Enter interviewer name"
                  required
                />
              </label>

              <label>
                Status
                <select
                  name="status"
                  value={interviewFormData.status}
                  onChange={handleInterviewChange}
                  required
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </label>

              <label>
                Notes
                <textarea
                  name="notes"
                  value={interviewFormData.notes}
                  onChange={handleInterviewChange}
                  placeholder="Enter interview notes"
                  rows="4"
                />
              </label>

              <button
                type="submit"
                className="recruitment-primary-btn"
              >
                {editingInterviewId !== null
                  ? 'Update Interview'
                  : 'Create Interview'}
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={closeInterviewModal}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}


      {/* =========================
          OFFERS SECTION
      ========================= */}

      <div className="recruitment-card">
        <div className="recruitment-card-header">
          <div>
            <h2>Job Offers</h2>
            <p>Manage offers made to selected candidates</p>
          </div>

          <div className="recruitment-filters">
            <input
              type="text"
              placeholder="Search offers..."
              value={offerSearchTerm}
              onChange={(e) => setOfferSearchTerm(e.target.value)}
            />

            <select
              value={offerStatusFilter}
              onChange={(e) => setOfferStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Expired">Expired</option>
            </select>

            <button
              type="button"
              className="recruitment-primary-btn"
              onClick={openOfferModal}
            >
              + Add Offer
            </button>
          </div>
        </div>

        <div className="recruitment-summary" style={{ padding: '20px' }}>
          <div className="recruitment-summary-card">
            <span>Total Offers</span>
            <strong>{totalOffers}</strong>
          </div>

          <div className="recruitment-summary-card">
            <span>Pending</span>
            <strong>{pendingOffers}</strong>
          </div>

          <div className="recruitment-summary-card">
            <span>Accepted</span>
            <strong>{acceptedOffers}</strong>
          </div>

          <div className="recruitment-summary-card">
            <span>Rejected</span>
            <strong>{rejectedOffers}</strong>
          </div>

          <div className="recruitment-summary-card">
            <span>Expired</span>
            <strong>{expiredOffers}</strong>
          </div>
        </div>

        <div className="table-container">
          <table className="recruitment-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Job Title</th>
                <th>Offer Date</th>
                <th>Joining Date</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Terms</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOffers.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    style={{ textAlign: 'center', padding: '40px' }}
                  >
                    No offers found.
                  </td>
                </tr>
              ) : (
                filteredOffers.map((offer) => (
                  <tr key={offer.id}>
                    <td>
                      <strong>
                        {offer.application?.applicant?.fullName ||
                          'Unknown Applicant'}
                      </strong>
                    </td>

                    <td>
                      {offer.jobTitle ||
                        offer.application?.jobVacancy?.jobTitle ||
                        '-'}
                    </td>

                    <td>{offer.offerDate || '-'}</td>
                    <td>{offer.joiningDate || '-'}</td>

                    <td>
                      {offer.salary !== null &&
                        offer.salary !== undefined
                        ? Number(offer.salary).toLocaleString()
                        : '-'}
                    </td>

                    <td>
                      <span
                        className={
                          offer.status === 'Rejected' ||
                            offer.status === 'Expired'
                            ? 'recruitment-status closed'
                            : 'recruitment-status open'
                        }
                      >
                        {offer.status || 'Pending'}
                      </span>
                    </td>

                    <td>{offer.terms || '-'}</td>

                    <td>
                      <div className="recruitment-actions">
                        <button
                          type="button"
                          className="recruitment-edit-btn"
                          onClick={() => handleOfferEdit(offer)}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="recruitment-delete-btn"
                          onClick={() => handleOfferDelete(offer.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showOfferModal && (
        <div className="modal-overlay">
          <div className="modal-content recruitment-modal">
            <h2>
              {editingOfferId !== null
                ? 'Edit Job Offer'
                : 'Add Job Offer'}
            </h2>

            <p className="modal-description">
              Create an offer for a selected candidate
            </p>

            <form onSubmit={handleOfferSubmit}>
              <label>
                Application

                <select
                  name="applicationId"
                  value={offerFormData.applicationId}
                  onChange={handleOfferChange}
                  required
                >
                  <option value="">Select Application</option>

                  {applications.map((application) => (
                    <option
                      key={application.id}
                      value={application.id}
                    >
                      {application.applicant?.fullName ||
                        'Unknown Applicant'}
                      {' - '}
                      {application.jobVacancy?.jobTitle ||
                        'Unknown Vacancy'}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Offer Date

                <input
                  type="date"
                  name="offerDate"
                  value={offerFormData.offerDate}
                  onChange={handleOfferChange}
                  required
                />
              </label>

              <label>
                Joining Date

                <input
                  type="date"
                  name="joiningDate"
                  value={offerFormData.joiningDate}
                  onChange={handleOfferChange}
                />
              </label>

              <label>
                Job Title

                <input
                  type="text"
                  name="jobTitle"
                  value={offerFormData.jobTitle}
                  onChange={handleOfferChange}
                  placeholder="Enter job title"
                  required
                />
              </label>

              <label>
                Salary

                <input
                  type="number"
                  name="salary"
                  value={offerFormData.salary}
                  onChange={handleOfferChange}
                  placeholder="Enter salary"
                  min="0"
                  step="0.01"
                  required
                />
              </label>

              <label>
                Status

                <select
                  name="status"
                  value={offerFormData.status}
                  onChange={handleOfferChange}
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Expired">Expired</option>
                </select>
              </label>

              <label>
                Terms

                <textarea
                  name="terms"
                  value={offerFormData.terms}
                  onChange={handleOfferChange}
                  placeholder="Enter offer terms"
                  rows="4"
                />
              </label>

              <button
                type="submit"
                className="recruitment-primary-btn"
              >
                {editingOfferId !== null
                  ? 'Update Offer'
                  : 'Create Offer'}
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={closeOfferModal}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}


      {/* =========================
          ONBOARDING SECTION
      ========================= */}

      <div className="recruitment-card">
        <div className="recruitment-card-header">
          <div>
            <h2>Onboarding</h2>
            <p>Track candidate onboarding and joining progress</p>
          </div>

          <div className="recruitment-filters">
            <input
              type="text"
              placeholder="Search onboarding..."
              value={onboardingSearchTerm}
              onChange={(e) => setOnboardingSearchTerm(e.target.value)}
            />

            <select
              value={onboardingStatusFilter}
              onChange={(e) => setOnboardingStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              type="button"
              className="recruitment-primary-btn"
              onClick={openOnboardingModal}
            >
              + Add Onboarding
            </button>
          </div>
        </div>

        <div className="recruitment-summary" style={{ padding: '20px' }}>
          <div className="recruitment-summary-card">
            <span>Total Onboarding</span>
            <strong>{totalOnboardings}</strong>
          </div>

          <div className="recruitment-summary-card">
            <span>Pending</span>
            <strong>{pendingOnboardings}</strong>
          </div>

          <div className="recruitment-summary-card">
            <span>In Progress</span>
            <strong>{inProgressOnboardings}</strong>
          </div>

          <div className="recruitment-summary-card">
            <span>Completed</span>
            <strong>{completedOnboardings}</strong>
          </div>

          <div className="recruitment-summary-card">
            <span>Cancelled</span>
            <strong>{cancelledOnboardings}</strong>
          </div>
        </div>

        <div className="table-container">
          <table className="recruitment-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Job Vacancy</th>
                <th>Start Date</th>
                <th>Completion Date</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredOnboardings.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    style={{ textAlign: 'center', padding: '40px' }}
                  >
                    No onboarding records found.
                  </td>
                </tr>
              ) : (
                filteredOnboardings.map((onboarding) => (
                  <tr key={onboarding.id}>
                    <td>
                      <strong>
                        {onboarding.application?.applicant?.fullName ||
                          'Unknown Applicant'}
                      </strong>
                    </td>

                    <td>
                      {onboarding.application?.jobVacancy?.jobTitle ||
                        'Unknown Vacancy'}
                    </td>

                    <td>{onboarding.startDate || '-'}</td>

                    <td>{onboarding.completionDate || '-'}</td>

                    <td>
                      <span
                        className={
                          onboarding.status === 'Completed' ||
                            onboarding.status === 'In Progress'
                            ? 'recruitment-status open'
                            : 'recruitment-status closed'
                        }
                      >
                        {onboarding.status || 'Pending'}
                      </span>
                    </td>

                    <td>{onboarding.notes || '-'}</td>

                    <td>
                      <div className="recruitment-actions">
                        <button
                          type="button"
                          onClick={() => handleOnboardingEdit(onboarding)}
                          className="recruitment-edit-btn"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOnboardingDelete(onboarding.id)}
                          className="recruitment-delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showOnboardingModal && (
        <div className="modal-overlay">
          <div className="modal-content recruitment-modal">
            <h2>
              {editingOnboardingId !== null
                ? 'Edit Onboarding'
                : 'Add Onboarding'}
            </h2>

            <p className="modal-description">
              Track onboarding details for a selected candidate
            </p>

            <form onSubmit={handleOnboardingSubmit}>
              <label>
                Application

                <select
                  name="applicationId"
                  value={onboardingFormData.applicationId}
                  onChange={handleOnboardingChange}
                  required
                >
                  <option value="">Select Application</option>

                  {applications.map((application) => (
                    <option
                      key={application.id}
                      value={application.id}
                    >
                      {application.applicant?.fullName ||
                        'Unknown Applicant'}
                      {' - '}
                      {application.jobVacancy?.jobTitle ||
                        'Unknown Vacancy'}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Start Date

                <input
                  type="date"
                  name="startDate"
                  value={onboardingFormData.startDate}
                  onChange={handleOnboardingChange}
                  required
                />
              </label>

              <label>
                Completion Date

                <input
                  type="date"
                  name="completionDate"
                  value={onboardingFormData.completionDate}
                  onChange={handleOnboardingChange}
                />
              </label>

              <label>
                Status

                <select
                  name="status"
                  value={onboardingFormData.status}
                  onChange={handleOnboardingChange}
                  required
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </label>

              <label>
                Notes

                <textarea
                  name="notes"
                  value={onboardingFormData.notes}
                  onChange={handleOnboardingChange}
                  placeholder="Enter onboarding notes"
                  rows="4"
                />
              </label>

              <button
                type="submit"
                className="recruitment-primary-btn"
              >
                {editingOnboardingId !== null
                  ? 'Update Onboarding'
                  : 'Create Onboarding'}
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={closeOnboardingModal}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}



      {/* =========================
          ONBOARDING TASKS SECTION
      ========================= */}

      <div className="recruitment-section">
        <div className="section-header">
          <div>
            <h2>Onboarding Tasks</h2>
            <p>Manage tasks required during employee onboarding</p>
          </div>

          <div className="section-actions">
            <input
              type="text"
              placeholder="Search onboarding tasks..."
              value={onboardingTaskSearchTerm}
              onChange={(e) => setOnboardingTaskSearchTerm(e.target.value)}
            />

            <select
              value={onboardingTaskStatusFilter}
              onChange={(e) => setOnboardingTaskStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <button
              type="button"
              className="recruitment-primary-btn"
              onClick={openOnboardingTaskModal}
            >
              + Add Task
            </button>
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card"><span>Total Tasks</span><strong>{totalOnboardingTasks}</strong></div>
          <div className="summary-card"><span>Pending</span><strong>{pendingOnboardingTasks}</strong></div>
          <div className="summary-card"><span>In Progress</span><strong>{inProgressOnboardingTasks}</strong></div>
          <div className="summary-card"><span>Completed</span><strong>{completedOnboardingTasks}</strong></div>
          <div className="summary-card"><span>Cancelled</span><strong>{cancelledOnboardingTasks}</strong></div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Task</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOnboardingTasks.length === 0 ? (
                <tr><td colSpan="6">No onboarding tasks found.</td></tr>
              ) : (
                filteredOnboardingTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.onboarding?.application?.applicant?.fullName || 'Unknown Applicant'}</td>
                    <td>{task.taskName || '-'}</td>
                    <td>{task.description || '-'}</td>
                    <td>{task.dueDate || '-'}</td>
                    <td>{task.status || 'Pending'}</td>
                    <td>
                      <div className="table-actions">
                        <button type="button" className="recruitment-edit-btn" onClick={() => handleOnboardingTaskEdit(task)}>Edit</button>
                        <button type="button" className="recruitment-delete-btn" onClick={() => handleOnboardingTaskDelete(task.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showOnboardingTaskModal && (
        <div className="modal-overlay">
          <div className="modal-content recruitment-modal">
            <h2>{editingOnboardingTaskId !== null ? 'Edit Onboarding Task' : 'Add Onboarding Task'}</h2>
            <p className="modal-description">Enter onboarding task details</p>

            <form onSubmit={handleOnboardingTaskSubmit}>
              <label>
                Onboarding
                <select name="onboardingId" value={onboardingTaskFormData.onboardingId} onChange={handleOnboardingTaskChange} required>
                  <option value="">Select Onboarding</option>
                  {onboardings.map((onboarding) => (
                    <option key={onboarding.id} value={onboarding.id}>
                      {onboarding.application?.applicant?.fullName || 'Unknown Applicant'} - {onboarding.application?.jobVacancy?.jobTitle || 'Unknown Position'}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Task Name
                <input type="text" name="taskName" value={onboardingTaskFormData.taskName} onChange={handleOnboardingTaskChange} placeholder="Enter task name" required />
              </label>

              <label>
                Description
                <textarea name="description" value={onboardingTaskFormData.description} onChange={handleOnboardingTaskChange} placeholder="Enter task description" rows="4" />
              </label>

              <label>
                Due Date
                <input type="date" name="dueDate" value={onboardingTaskFormData.dueDate} onChange={handleOnboardingTaskChange} />
              </label>

              <label>
                Status
                <select name="status" value={onboardingTaskFormData.status} onChange={handleOnboardingTaskChange}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </label>

              <button type="submit" className="recruitment-primary-btn">
                {editingOnboardingTaskId !== null ? 'Update Task' : 'Create Task'}
              </button>
              <button type="button" className="secondary-btn" onClick={closeOnboardingTaskModal}>Close</button>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          DOCUMENT TRACKING SECTION
      ========================= */}

      <div className="recruitment-section">
        <div className="section-header">
          <div>
            <h2>Document Tracking</h2>
            <p>Track documents submitted during candidate onboarding</p>
          </div>

          <div className="section-actions">
            <input
              type="text"
              placeholder="Search documents..."
              value={documentSearchTerm}
              onChange={(e) => setDocumentSearchTerm(e.target.value)}
            />

            <select value={documentStatusFilter} onChange={(e) => setDocumentStatusFilter(e.target.value)}>
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Submitted">Submitted</option>
              <option value="Verified">Verified</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select value={documentTypeFilter} onChange={(e) => setDocumentTypeFilter(e.target.value)}>
              <option value="All">All Types</option>
              <option value="Identity">Identity</option>
              <option value="Education">Education</option>
              <option value="Bank Details">Bank Details</option>
              <option value="Employment">Employment</option>
              <option value="Other">Other</option>
            </select>

            <button type="button" className="recruitment-primary-btn" onClick={openDocumentModal}>
              + Add Document
            </button>
          </div>
        </div>

        <div className="summary-cards">
          <div className="summary-card"><span>Total Documents</span><strong>{totalDocuments}</strong></div>
          <div className="summary-card"><span>Pending</span><strong>{pendingDocuments}</strong></div>
          <div className="summary-card"><span>Submitted</span><strong>{submittedDocuments}</strong></div>
          <div className="summary-card"><span>Verified</span><strong>{verifiedDocuments}</strong></div>
          <div className="summary-card"><span>Rejected</span><strong>{rejectedDocuments}</strong></div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Document Name</th>
                <th>Type</th>
                <th>Submitted Date</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.length === 0 ? (
                <tr><td colSpan="7">No documents found.</td></tr>
              ) : (
                filteredDocuments.map((document) => (
                  <tr key={document.id}>
                    <td>{document.onboarding?.application?.applicant?.fullName || 'Unknown Applicant'}</td>
                    <td>{document.documentName || '-'}</td>
                    <td>{document.documentType || '-'}</td>
                    <td>{document.submittedDate || '-'}</td>
                    <td>{document.status || 'Pending'}</td>
                    <td>{document.notes || '-'}</td>
                    <td>
                      <div className="table-actions">
                        <button type="button" className="recruitment-edit-btn" onClick={() => handleDocumentEdit(document)}>Edit</button>
                        <button type="button" className="recruitment-delete-btn" onClick={() => handleDocumentDelete(document.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showDocumentModal && (
        <div className="modal-overlay">
          <div className="modal-content recruitment-modal">
            <h2>{editingDocumentId !== null ? 'Edit Document' : 'Add Document'}</h2>
            <p className="modal-description">Enter document tracking details</p>

            <form onSubmit={handleDocumentSubmit}>
              <label>
                Onboarding
                <select name="onboardingId" value={documentFormData.onboardingId} onChange={handleDocumentChange} required>
                  <option value="">Select Onboarding</option>
                  {onboardings.map((onboarding) => (
                    <option key={onboarding.id} value={onboarding.id}>
                      {onboarding.application?.applicant?.fullName || 'Unknown Applicant'} - {onboarding.application?.jobVacancy?.jobTitle || 'Unknown Position'}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Document Name
                <input type="text" name="documentName" value={documentFormData.documentName} onChange={handleDocumentChange} placeholder="e.g. NIC" required />
              </label>

              <label>
                Document Type
                <select name="documentType" value={documentFormData.documentType} onChange={handleDocumentChange}>
                  <option value="Identity">Identity</option>
                  <option value="Education">Education</option>
                  <option value="Bank Details">Bank Details</option>
                  <option value="Employment">Employment</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label>
                Submitted Date
                <input type="date" name="submittedDate" value={documentFormData.submittedDate} onChange={handleDocumentChange} />
              </label>

              <label>
                Status
                <select name="status" value={documentFormData.status} onChange={handleDocumentChange}>
                  <option value="Pending">Pending</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Verified">Verified</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </label>

              <label>
                Notes
                <textarea name="notes" value={documentFormData.notes} onChange={handleDocumentChange} placeholder="Enter document notes" rows="4" />
              </label>

              <button type="submit" className="recruitment-primary-btn">
                {editingDocumentId !== null ? 'Update Document' : 'Create Document'}
              </button>
              <button type="button" className="secondary-btn" onClick={closeDocumentModal}>Close</button>
            </form>
          </div>
        </div>
      )}

      {/* =========================
          APPLICANTS SECTION
      ========================= */}

      <div className="recruitment-card">
        <div className="recruitment-card-header">
          <div>
            <h2>Applicants</h2>
            <p>Manage job applicants and candidate information</p>
          </div>

          <div className="recruitment-filters">
            <input
              type="text"
              placeholder="Search applicants..."
              value={applicantSearchTerm}
              onChange={(e) => setApplicantSearchTerm(e.target.value)}
            />

            <select
              value={applicantStatusFilter}
              onChange={(e) => setApplicantStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <button
              type="button"
              className="recruitment-primary-btn"
              onClick={openAddApplicantModal}
            >
              + Add Applicant
            </button>
          </div>
        </div>

        <div className="recruitment-summary" style={{ padding: '20px' }}>
          <div className="recruitment-summary-card">
            <span>Total Applicants</span>
            <strong>{totalApplicants}</strong>
          </div>
          <div className="recruitment-summary-card">
            <span>Active Applicants</span>
            <strong>{activeApplicants}</strong>
          </div>
          <div className="recruitment-summary-card">
            <span>Inactive Applicants</span>
            <strong>{inactiveApplicants}</strong>
          </div>
        </div>

        <div className="table-container">
          <table className="recruitment-table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplicants.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: 'center',
                      padding: '40px',
                    }}
                  >
                    No applicants found.
                  </td>
                </tr>
              ) : (
                filteredApplicants.map((applicant) => (
                  <tr key={applicant.id}>
                    <td>
                      <strong>{applicant.fullName}</strong>
                    </td>
                    <td>{applicant.email}</td>
                    <td>{applicant.phone}</td>
                    <td>{applicant.address || '-'}</td>
                    <td>
                      <span
                        className={
                          applicant.status === 'Active'
                            ? 'recruitment-status open'
                            : 'recruitment-status closed'
                        }
                      >
                        {applicant.status}
                      </span>
                    </td>
                    <td>
                      <div className="recruitment-actions">
                        <button
                          type="button"
                          onClick={() => handleApplicantEdit(applicant)}
                          className="recruitment-edit-btn"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleApplicantDelete(applicant.id)}
                          className="recruitment-delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>


      {/* =========================
          ADD / EDIT MODAL
      ========================= */}

      {showApplicantModal && (
        <div className="modal-overlay">
          <div className="modal-content recruitment-modal">
            <h2>
              {editingApplicantId !== null
                ? 'Edit Applicant'
                : 'Add Applicant'}
            </h2>

            <p className="modal-description">
              Enter applicant details
            </p>

            <form onSubmit={handleApplicantSubmit}>
              <label>
                Full Name
                <input
                  type="text"
                  name="fullName"
                  value={applicantFormData.fullName}
                  onChange={handleApplicantChange}
                  placeholder="Enter full name"
                  required
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={applicantFormData.email}
                  onChange={handleApplicantChange}
                  placeholder="Enter email"
                  required
                />
              </label>

              <label>
                Phone
                <input
                  type="text"
                  name="phone"
                  value={applicantFormData.phone}
                  onChange={handleApplicantChange}
                  placeholder="Enter phone number"
                  required
                />
              </label>

              <label>
                Address
                <textarea
                  name="address"
                  value={applicantFormData.address}
                  onChange={handleApplicantChange}
                  placeholder="Enter address"
                  rows="3"
                />
              </label>

              <label>
                Resume Path
                <input
                  type="text"
                  name="resumePath"
                  value={applicantFormData.resumePath}
                  onChange={handleApplicantChange}
                  placeholder="Optional resume path"
                />
              </label>

              <label>
                Status
                <select
                  name="status"
                  value={applicantFormData.status}
                  onChange={handleApplicantChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </label>

              <button
                type="submit"
                className="recruitment-primary-btn"
              >
                {editingApplicantId !== null
                  ? 'Update Applicant'
                  : 'Create Applicant'}
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={closeApplicantModal}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}


      {showModal && (

        <div className="modal-overlay">

          <div className="modal-content recruitment-modal">

            <h2>

              {editingVacancyId !== null
                ? 'Edit Job Vacancy'
                : 'Add Job Vacancy'}

            </h2>


            <p className="modal-description">
              Enter job vacancy details
            </p>


            <form
              onSubmit={handleSubmit}
            >

              {/* JOB TITLE */}

              <label>

                Job Title

                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Enter job title"
                  required
                />

              </label>


              {/* DEPARTMENT */}

              <label>

                Department

                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="Enter department"
                  required
                />

              </label>


              {/* POSITION */}

              <label>

                Position

                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Enter position"
                  required
                />

              </label>


              {/* DESCRIPTION */}

              <label>

                Description

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter job description"
                  rows="4"
                />

              </label>


              {/* REQUIREMENTS */}

              <label>

                Requirements

                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="Enter job requirements"
                  rows="4"
                />

              </label>


              {/* OPENING DATE */}

              <label>

                Opening Date

                <input
                  type="date"
                  name="openingDate"
                  value={formData.openingDate}
                  onChange={handleChange}
                  required
                />

              </label>


              {/* CLOSING DATE */}

              <label>

                Closing Date

                <input
                  type="date"
                  name="closingDate"
                  value={formData.closingDate}
                  onChange={handleChange}
                />

              </label>


              {/* STATUS */}

              <label>

                Status

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >

                  <option value="Open">
                    Open
                  </option>

                  <option value="Closed">
                    Closed
                  </option>

                </select>

              </label>


              {/* BUTTONS */}

              <button
                type="submit"
                className="recruitment-primary-btn"
              >

                {editingVacancyId !== null
                  ? 'Update Vacancy'
                  : 'Create Vacancy'}

              </button>


              <button
                type="button"
                className="secondary-btn"
                onClick={closeModal}
              >
                Close
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  )
}

export default Recruitment