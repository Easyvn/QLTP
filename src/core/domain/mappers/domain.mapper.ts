export default abstract class DomainMapper<D, E> {
    abstract toDomain(entity: E): D
    abstract fromDomain(domain: D): E
    toDomains(entities: E[]): D[] {
        return entities.map(element => this.toDomain(element))
    }
    fromDomains(domains: D[]): E[] {
        return domains.map(element => this.fromDomain(element))
    }
}