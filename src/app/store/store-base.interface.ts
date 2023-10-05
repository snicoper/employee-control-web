export interface StoreBase<TEntity> {
  /** Refrescar lista de TEntity. */
  refresh(): void;

  /** Obtener valor actual de TEntity. */
  getValue(): TEntity;

  /** Actualizar lista de TEntity. */
  setValue(entity: TEntity): void;
}
