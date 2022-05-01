package io.github.dougllasfps.vendasapi.model.repository;

import io.github.dougllasfps.vendasapi.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository  extends JpaRepository<Cliente, Long> {

}
