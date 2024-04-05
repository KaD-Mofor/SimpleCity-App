package com.simple_city.app.config;

import com.simple_city.app.entities.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class RestDataConfig implements RepositoryRestConfigurer {

    /**
     * This method exposes standard rest api end points for the following classes:
     * Customer
     * Product
     * ProductCategory
     * <p>
     * Set page configuration parameters
     *
     * @param config
     * @param cors
     */

//    private EntityManager entityManager;
//
//    @Autowired
//    public RestDataConfig(EntityManager theEntityManager) {
//        entityManager = theEntityManager;
//    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(Product.class);
        config.exposeIdsFor(ProductCategory.class);
        config.exposeIdsFor(Address.class);
        config.exposeIdsFor(Customer.class);
        config.setDefaultPageSize(Integer.MAX_VALUE);
        config.setMaxPageSize(Integer.MAX_VALUE);

        //Disable some HTTP methods for some rest Apis
        HttpMethod[] unsupportedActions = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH};

        disableHttpMethods(Cart.class, config, unsupportedActions);

        //@TODO verify if entity ids can be exposed using the above commented method. if yes, delete all code below.

        //Automatically expose product id and generate product-category
//        exposeIds(config);
    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] unsupportedActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(unsupportedActions));
    }

//    private void exposeIds(RepositoryRestConfiguration config) {
//        //get classes from entity manager
//        Set<EntityType<?>> entityTypes = entityManager.getMetamodel().getEntities();
//
//        List<Class> entityClasses = new ArrayList<>();
//
//        for (EntityType tempEntityType : entityTypes) {
//            entityClasses.add(tempEntityType.getJavaType());
//        }
//        Class[] domainTypes = entityClasses.toArray(new Class[0]);
//        config.exposeIdsFor(domainTypes);
//    }
}


