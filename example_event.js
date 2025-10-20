  /**
   * Ejemplo de evento del funnel
   * Estos eventos se tendrán que dar de alta en GA4/Firebase
   * El parámetro funnel_step será dinámico también en función del paso del funnel
   * @param {string} serviceId - ID del servicio
   * @param {string} serviceName - Nombre del servicio (ej: "Lavado Premium", "Pulido", etc.)
   * @param {string} serviceCategory - Categoría del servicio (ej: "Lavado", "Reparación", etc.)
   */
  async logServiceSelected(serviceId, serviceName, serviceCategory = null) {
    await this.logEvent('service_selected', {
      service_id: serviceId,
      service_name: serviceName,
      service_category: serviceCategory,
      funnel_step: 'step_2_service_selection' // 
    });
  }
