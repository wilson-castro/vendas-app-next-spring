package io.github.dougllasfps.vendasapi.model.repository;

import io.github.dougllasfps.vendasapi.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}
