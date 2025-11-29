import { defineStore } from 'pinia'
import { ProjectService } from '@/services/projectService'

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchProjects({ featuredOnly = false } = {}) {
      this.loading = true
      this.error = null
      try {
        const data = await ProjectService.getProjects({ featuredOnly })
        this.projects = data
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
